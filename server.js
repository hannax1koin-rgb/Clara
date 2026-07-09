import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { desc, eq } from "drizzle-orm";
import { db } from "./db/index.js";
import { complaints } from "./db/schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => res.status(200).send("ok"));

// Serve React frontend static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

// GET /api/complaints — return all complaints ordered by createdAt descending
app.get("/api/complaints", async (req, res) => {
  try {
    const all = await db.select().from(complaints).orderBy(desc(complaints.createdAt));
    res.json(all);
  } catch (err) {
    console.error("GET /api/complaints error:", err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// POST /api/complaints — create a new complaint
app.post("/api/complaints", async (req, res) => {
  try {
    const { title, details, impact } = req.body;
    if (!title || !details || !impact) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }
    const [created] = await db
      .insert(complaints)
      .values({ title, details, impact })
      .returning();
    res.status(201).json(created);
  } catch (err) {
    console.error("POST /api/complaints error:", err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// PATCH /api/complaints/:id — update status and/or compensationLink
app.patch("/api/complaints/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, compensationLink } = req.body;

    const update = {};
    if (status !== undefined) update.status = status;
    if (compensationLink !== undefined) update.compensationLink = compensationLink;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "لا توجد حقول للتحديث" });
    }

    const [updated] = await db
      .update(complaints)
      .set(update)
      .where(eq(complaints.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ message: "الشكوى غير موجودة" });
    }
    res.json(updated);
  } catch (err) {
    console.error("PATCH /api/complaints/:id error:", err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// SPA fallback — serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

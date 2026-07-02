import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complaints } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    const all = await db.select().from(complaints).orderBy(desc(complaints.createdAt));
    return Response.json(all);
  }

  if (req.method === "POST") {
    const { title, details, impact } = await req.json();
    if (!title || !details || !impact) {
      return Response.json({ message: "جميع الحقول مطلوبة" }, { status: 400 });
    }
    const [created] = await db.insert(complaints).values({ title, details, impact }).returning();
    return Response.json(created, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/complaints",
};

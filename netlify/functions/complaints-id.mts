import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complaints } from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  const { id } = context.params;
  const { status, compensationLink } = await req.json();

  const update: Partial<typeof complaints.$inferInsert> = {};
  if (status) update.status = status;
  if (compensationLink !== undefined) update.compensationLink = compensationLink;

  const [updated] = await db
    .update(complaints)
    .set(update)
    .where(eq(complaints.id, Number(id)))
    .returning();

  if (!updated) {
    return Response.json({ message: "الشكوى غير موجودة" }, { status: 404 });
  }
  return Response.json(updated);
};

export const config: Config = {
  path: "/api/complaints/:id",
  method: "PATCH",
};

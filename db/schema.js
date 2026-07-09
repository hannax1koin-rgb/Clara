import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const complaints = pgTable("complaints", {
  id: serial().primaryKey(),
  title: text().notNull(),
  details: text().notNull(),
  impact: text().notNull(),
  status: text().notNull().default("لم يتم الحل"),
  compensationLink: text("compensation_link").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

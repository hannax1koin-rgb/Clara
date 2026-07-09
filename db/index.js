import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

const useSsl =
  process.env.NODE_ENV === "production" ||
  (process.env.DATABASE_URL || "").includes("sslmode=require");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:5432/clara",
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });

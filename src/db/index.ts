import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_URL!

export const sql = postgres(connectionString, { max: 1 })
export const db = drizzle(sql);





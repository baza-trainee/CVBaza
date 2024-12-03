import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const client = postgres(process.env.DATABASE_URL!, {
  max: process.env.DB_MIGRATING ? 1 : undefined,
});

const db = drizzle(client, {
  schema,
});

export default db;

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from '@neondatabase/serverless';
import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? new Pool({ connectionString: env.DATABASE_URL, ssl: true });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
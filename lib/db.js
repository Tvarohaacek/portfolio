import { sql } from '@vercel/postgres';

// Lazily create the posts table once per serverless instance.
let schemaReady;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS posts (
        id         SERIAL PRIMARY KEY,
        content    TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.catch((err) => {
      schemaReady = undefined; // allow a retry on the next request
      throw err;
    });
  }
  return schemaReady;
}

export { sql };

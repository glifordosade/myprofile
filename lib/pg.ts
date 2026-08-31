import { Pool } from 'pg';

let pool = null;
let ensured = false;

export function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.PG_POOL_MAX || 5),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    pool.on('error', (err) => console.error('Unexpected pg pool error', err));
  }
  return pool;
}

export async function ensureContactsTable() {
  const p = getPool();
  if (!p || ensured) return;
  await p.query(
    `CREATE TABLE IF NOT EXISTS contacts (
      id UUID PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(320) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`
  );
  ensured = true;
}

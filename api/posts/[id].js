import { sql, ensureSchema } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';
import { readJson } from '../../lib/http.js';

export default async function handler(req, res) {
  await ensureSchema();

  const id = parseInt(req.query.id, 10);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'bad id' });
    return;
  }

  if (req.method === 'GET') {
    const { rows } = await sql`
      SELECT id, content, created_at, updated_at FROM posts WHERE id = ${id}
    `;
    if (!rows.length) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    res.status(200).json({ post: rows[0] });
    return;
  }

  // Everything below mutates and requires an authenticated admin.
  if (!isAdmin(req)) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  if (req.method === 'PUT') {
    const body = await readJson(req);
    const content = (body?.content || '').trim();
    if (!content) {
      res.status(400).json({ error: 'Prázdný příspěvek' });
      return;
    }
    const { rows } = await sql`
      UPDATE posts SET content = ${content}, updated_at = now() WHERE id = ${id}
      RETURNING id, content, created_at, updated_at
    `;
    if (!rows.length) {
      res.status(404).json({ error: 'not found' });
      return;
    }
    res.status(200).json({ post: rows[0] });
    return;
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'method' });
}

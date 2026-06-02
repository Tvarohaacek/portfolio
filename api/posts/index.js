import { sql, ensureSchema } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';
import { readJson } from '../../lib/http.js';

const EXCERPT_LEN = 280;

function makeExcerpt(text) {
  const t = text.trim();
  if (t.length <= EXCERPT_LEN) return { excerpt: t, truncated: false };
  let cut = t.slice(0, EXCERPT_LEN);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 120) cut = cut.slice(0, lastSpace);
  return { excerpt: cut.trimEnd() + '…', truncated: true };
}

export default async function handler(req, res) {
  await ensureSchema();

  if (req.method === 'GET') {
    const { rows } = await sql`
      SELECT id, content, created_at, updated_at FROM posts ORDER BY created_at DESC
    `;
    const posts = rows.map((r) => {
      const ex = makeExcerpt(r.content);
      return {
        id: r.id,
        excerpt: ex.excerpt,
        truncated: ex.truncated,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      };
    });
    res.status(200).json({ posts });
    return;
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }
    const body = await readJson(req);
    const content = (body?.content || '').trim();
    if (!content) {
      res.status(400).json({ error: 'Prázdný příspěvek' });
      return;
    }
    const { rows } = await sql`
      INSERT INTO posts (content) VALUES (${content})
      RETURNING id, content, created_at, updated_at
    `;
    res.status(201).json({ post: rows[0] });
    return;
  }

  res.status(405).json({ error: 'method' });
}

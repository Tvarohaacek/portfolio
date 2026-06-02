import { verifyPassword, setSessionCookie } from '../lib/auth.js';
import { readJson } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method' });
    return;
  }
  const body = await readJson(req);
  if (!verifyPassword(body?.password)) {
    res.status(401).json({ ok: false, error: 'Neplatné heslo' });
    return;
  }
  setSessionCookie(res);
  res.status(200).json({ ok: true });
}

import { isAdmin } from '../lib/auth.js';

export default function handler(req, res) {
  res.status(200).json({ admin: isAdmin(req) });
}

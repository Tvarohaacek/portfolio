import crypto from 'node:crypto';

const COOKIE = 'pov_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

// --- Password (stored only as a scrypt hash in ADMIN_PASSWORD_HASH) ---

export function verifyPassword(password) {
  const stored = process.env.ADMIN_PASSWORD_HASH || '';
  const [scheme, saltHex, hashHex] = stored.split('$');
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  let actual;
  try {
    actual = crypto.scryptSync(String(password ?? ''), Buffer.from(saltHex, 'hex'), expected.length);
  } catch {
    return false;
  }
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

// --- Signed session token (HMAC over a payload, secret in SESSION_SECRET) ---

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not set');
  return s;
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function tokenValid(token) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

// --- Cookie helpers ---

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

export function isAdmin(req) {
  return tokenValid(parseCookies(req)[COOKIE]);
}

export function setSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE}=${createToken()}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${MAX_AGE}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
}

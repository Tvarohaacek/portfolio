import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Generates an admin password + session secret. Writes the secret material to
// temp files (for piping into `vercel env add`) and prints ONLY the plaintext
// password, which is shown to the user once and never stored anywhere.
const password = crypto.randomBytes(12).toString('base64url'); // ~16 chars
const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64);
const passwordHash = `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
const sessionSecret = crypto.randomBytes(32).toString('hex');

const dir = os.tmpdir();
fs.writeFileSync(path.join(dir, 'pov_hash'), passwordHash, { mode: 0o600 });
fs.writeFileSync(path.join(dir, 'pov_secret'), sessionSecret, { mode: 0o600 });

process.stdout.write(password);

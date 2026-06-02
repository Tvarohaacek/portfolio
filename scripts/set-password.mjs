#!/usr/bin/env node
// Set the blog admin password. Prompts for a password (hidden), stores ONLY a
// scrypt hash in Vercel (ADMIN_PASSWORD_HASH across all environments), then
// redeploys production. The plaintext password never leaves this machine.
//
// Usage:
//   node scripts/set-password.mjs
//   NEW_ADMIN_PASSWORD='…' node scripts/set-password.mjs   # non-interactive
import crypto from 'node:crypto';
import readline from 'node:readline';
import { execFileSync } from 'node:child_process';

const NAME = 'ADMIN_PASSWORD_HASH';
const ENVS = ['production', 'preview', 'development'];

function askHidden(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(query);
    rl._writeToOutput = () => {}; // suppress echo
    rl.question('', (value) => { rl.close(); process.stdout.write('\n'); resolve(value); });
  });
}

function vercel(args) {
  return execFileSync('vercel', args, { stdio: ['ignore', 'pipe', 'pipe'] });
}

let password = process.env.NEW_ADMIN_PASSWORD;
if (!password) {
  password = await askHidden('New admin password: ');
  const confirm = await askHidden('Confirm password:   ');
  if (password !== confirm) { console.error('✗ Passwords do not match.'); process.exit(1); }
}
if (!password || password.length < 8) {
  console.error('✗ Password must be at least 8 characters.');
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64);
const value = `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;

console.log('\nUpdating Vercel environment variables…');
for (const env of ENVS) {
  try { vercel(['env', 'rm', NAME, env, '--yes']); } catch { /* may not exist yet */ }
  try {
    vercel(['env', 'add', NAME, env, '--value', value, '--yes']);
    console.log(`  ✓ ${env}`);
  } catch (err) {
    console.error(`  ✗ ${env}: ${err.stderr?.toString() || err.message}`);
  }
}

console.log('\nRedeploying production so the new password takes effect…');
execFileSync('vercel', ['deploy', '--prod', '--yes'], { stdio: 'inherit' });
console.log('\n✓ Done. Log in at /admin with your new password.');

import { ensureSchema } from '../lib/db.js';

await ensureSchema();
console.log('Schema ready: posts table exists.');
process.exit(0);

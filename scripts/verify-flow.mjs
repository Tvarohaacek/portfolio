#!/usr/bin/env node
// Verifies the full authenticated blog flow against production:
// login → create → list → single API → page render → edit → auth-guard → delete.
// Prompts for the admin password (hidden); it never leaves this machine.
//
// Usage:
//   node scripts/verify-flow.mjs
//   ADMIN_PASSWORD='…' node scripts/verify-flow.mjs   # non-interactive
import readline from 'node:readline';

const URL = process.env.BLOG_URL || 'https://self-ebon-xi.vercel.app';

function askHidden(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(query);
    rl._writeToOutput = () => {};
    rl.question('', (value) => { rl.close(); process.stdout.write('\n'); resolve(value); });
  });
}

let pass = 0, fail = 0;
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
  ok ? pass++ : fail++;
};

const password = process.env.ADMIN_PASSWORD || (await askHidden('Admin password: '));

// 1. login
const login = await fetch(URL + '/api/login', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ password }),
});
check('login with password', login.status === 200, 'HTTP ' + login.status);
const cookie = (login.headers.get('set-cookie') || '').split(';')[0];
if (!cookie) { console.error('\nNo session cookie returned — check the password. Aborting.'); process.exit(1); }
const authHeaders = { 'content-type': 'application/json', cookie };

// 2. create (long enough to be truncated in the list excerpt)
const content = `Ověřovací příspěvek ${new Date().toISOString()}\n\n` + 'Lorem ipsum dolor sit amet. '.repeat(20);
const create = await fetch(URL + '/api/posts', { method: 'POST', headers: authHeaders, body: JSON.stringify({ content }) });
const createdId = (await create.json()).post?.id;
check('create post (admin)', create.status === 201 && !!createdId, 'id=' + createdId);

// 3. list shows it with a truncated excerpt
const list = await (await fetch(URL + '/api/posts')).json();
const inList = (list.posts || []).find((p) => p.id === createdId);
check('appears in list', !!inList);
check('list excerpt is truncated', !!inList && inList.truncated === true);

// 4. single API returns full content
const single = await (await fetch(URL + '/api/posts/' + createdId)).json();
check('single API returns full content', single.post?.content === content);

// 5. /yapping/:id page renders
const page = await fetch(URL + '/yapping/' + createdId);
const html = await page.text();
check('/yapping/:id page serves', page.status === 200 && html.includes('class="single"'));

// 6. edit
const edited = content + '\n\n(upraveno)';
const upd = await fetch(URL + '/api/posts/' + createdId, { method: 'PUT', headers: authHeaders, body: JSON.stringify({ content: edited }) });
const updPost = (await upd.json()).post;
check('edit post (admin)', upd.status === 200 && updPost?.content === edited && updPost?.updated_at !== updPost?.created_at);

// 7. guard: create without session is rejected
const noauth = await fetch(URL + '/api/posts', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ content: 'x' }) });
check('create without session blocked', noauth.status === 401);

// 8. delete + confirm gone
const del = await fetch(URL + '/api/posts/' + createdId, { method: 'DELETE', headers: { cookie } });
check('delete post (admin)', del.status === 200);
const gone = await fetch(URL + '/api/posts/' + createdId);
check('post is 404 after delete', gone.status === 404);

// 9. logout clears session
await fetch(URL + '/api/logout', { method: 'POST', headers: { cookie } });

console.log(`\n${fail === 0 ? '✅ ALL PASSED' : '❌ SOME FAILED'} — ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);

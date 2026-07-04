# projekt1

Sem patří zdrojový kód Vite + React projektu, který poběží na `michaltvaroh.cz/projekt1`.

Web se deployuje jako čistě statický (bez build kroku na Vercelu), takže sem stačí
nahrát hotový zdrojový kód a lokálně vybuildovaný výstup zkopírovat do `/projekt1`
v rootu repa. Aby to fungovalo bez úprav, projekt musí mít:

**vite.config.ts**
```ts
export default defineConfig({
  base: '/projekt1/',
  build: {
    outDir: '../../projekt1',   // výstup rovnou do rootu repa
    emptyOutDir: true,
  },
});
```

**Router**
```tsx
<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
```

**Postup nasazení**
1. `npm run build` (uvnitř tohoto projektu)
2. commit + push vygenerovaného `/projekt1` v rootu repa
3. Vercel ho nasadí jako statický obsah, `vercel.json` v rootu už má rewrite pravidlo
   pro SPA fallback (`/projekt1/:path*` → `/projekt1/index.html`)

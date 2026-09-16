# Pomodoro Timer — Next.js wrapper

Wraps the **5787-18** Pomodoro Timer build (talking-bear onboarding prototype)
in a minimal Next.js app so it's easy to build and deploy.

## What's inside

- `public/pomodoro-timer-5787-18.html` — the timer itself, **byte-identical** to
  `workspace/your_files/pomodoro-timer/pomodoro-timer-5787-18.html`
  (MD5 `c29191a333619041cd7f2d57c63c9e47`). Fully self-contained: Three.js r180
  is inlined as a base64 data-URL module, so the page needs no network at all.
- `app/page.tsx` — renders the timer in a full-viewport iframe and mirrors its
  live tab-bar countdown title (the Unicode monospace digits) onto the outer page.

## Commands

```bash
npm install   # once
npm run dev   # local dev server → http://localhost:3000
npm run build # static export → ./out (host anywhere: Vercel, Netlify, S3…)
```

`next.config.ts` sets `output: "export"`, so `npm run build` produces a plain
static site — no Node server needed in production.

## Swapping in a newer timer build

Drop the new file into `public/`, update the `src` in `app/page.tsx`, rebuild.

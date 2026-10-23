# Mohammed Nisaruddin — Portfolio

A single-page portfolio for **Mohammed Nisaruddin**, AI & ML student and AI-integrated
full-stack developer. Built with React 19, TypeScript, Vite and Tailwind CSS 4, with no
runtime UI dependencies beyond `lucide-react`.

The introduction is an original animated android, rendered live in WebGL. A faceted,
hard-surface bust — helmet plates, wraparound visor, ear sensors, collar and chest core — is
assembled from its parts the moment the boot overlay lifts, then idles: it floats, tracks the
pointer, and runs a slow scan sweep across the visor. The boot overlay is skippable and plays
once per tab. No splash screen blocks the content: the page is readable immediately, and all
motion stops under `prefers-reduced-motion: reduce`.

Every claim on the site is sourced from the supplied profile details, the GitHub profile
README, or a public repository's README. Project case studies were written after reading
each repository, including its stated scope and limitations.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # typecheck + production build into dist/
npm run preview   # preview the production build
npm run typecheck
```

The build is fully static. Deploy `dist/` to any static host. The unknown-path view is
rendered client-side, so a host rewrite to `index.html` is recommended for clean 404
handling on deep links.

## Editing content

Content is centralised so nothing needs editing inside layout code:

| File | Contains |
| --- | --- |
| `src/data/profile.ts` | Name, headline, contact details, about copy, skill groups, focus areas, education and certification |
| `src/data/projects.ts` | All five case studies: summary, problem, features, implementation notes, stack, repository and live URLs |
| `src/three/androidHead.ts` | The WebGL android: geometry, materials, lighting and the assembly/idle animation |
| `src/components/RobotVisual.tsx` | Static SVG android used as the fallback when WebGL is unavailable |
| `src/components/ProjectArt.tsx` | The five bespoke SVG visuals, one per project |
| `src/lib/github.ts` | GitHub API fetch, typed repository model and the verified fallback list |
| `src/components/Contact.tsx` | Contact form fields, validation rules and the email handoff |

To add a project: append an entry to `projects` in `src/data/projects.ts`, choose one of the
existing `visual` keys (or add a new artwork component), and optionally set `featured: true`.
The featured card is the first project with that flag.

## GitHub integration

The repository list in the “On GitHub” section is fetched client-side from
`https://api.github.com/users/nisar-studio/repos`. No token is used or exposed.

- Unauthenticated GitHub API requests are limited per IP (60/hour). If the API responds
  with an error or rate limit, the section falls back to the verified repository list in
  `src/lib/github.ts` and labels the data as cached instead of failing.
- For guaranteed live data at higher traffic, proxy the request through a serverless
  function with a GitHub token kept server-side. Nothing in this front end needs to change
  except the endpoint.

## Contact form

The form validates name, email, subject and message, then hands the composed message to the
visitor’s email client via a `mailto:` link addressed to `mnisaruddin56@gmail.com`. It never
claims to send a message from the page. The confirmation state says exactly that and offers
a copy-to-clipboard fallback.

To switch to a real form backend, replace the `window.location.href` handoff in
`src/components/Contact.tsx` with a `fetch` to your endpoint, keep the same field-level
validation, and only show the success state after a successful response.

## Theme and motion

Dark is the default; the toggle persists the choice in `localStorage` and is applied before
first paint to avoid a flash. All reveal animations are pause-free CSS transitions driven by
an `IntersectionObserver` and are disabled under `prefers-reduced-motion: reduce`; content is
also forced visible in print.

The android is rendered by three.js in `src/three/androidHead.ts` and mounted through
`AndroidStage.tsx`:

- The module is imported lazily, so three.js never delays first paint, and the canvas fades in
  once its first frame is ready.
- The assembly, idle float, pointer parallax and visor scan all run in one
  `requestAnimationFrame` loop. Nothing in React re-renders while the robot moves.
- Every plate, light and material is generated in code — there are no model or texture files to
  load, and the bust is framed by height so it stays composed from 360 px to 1920 px.
- The hero holds its assembled state until the boot overlay reports it has finished, so the
  android builds itself exactly as the veil lifts. A four-second timeout guarantees it never
  stays hidden if that signal is missed.
- Under `prefers-reduced-motion: reduce` the robot renders assembled and still, the scan sweep
  and parallax are skipped, and the boot overlay does not play. Without WebGL the SVG
  `RobotVisual.tsx` fallback keeps the hero complete.

## Assets

- `public/favicon.svg` — monogram mark.
- `public/og.png` — 1200×630 social image.
- `public/robots.txt` — permissive crawl rules. A sitemap and canonical URL are intentionally
  omitted until a production domain exists.

## Known limitations

- No résumé file was supplied, so no download button is shown. Add a PDF to `public/` and a
  link in the hero when one is available.
- The Tata certification has no public verification URL, so none is shown or invented.
- The GitHub section can show cached data in restricted or rate-limited networks (see above).
- Projects without a deployed demo are labelled as such; no placeholder links exist.

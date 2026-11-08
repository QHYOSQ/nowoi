# NOWOI — The independent website field guide

A complete Chinese/English publication with six practical walkthroughs and four
working browser exercises. This replaces the previous collection of isolated
utilities with one focused learning journey.

## Run locally

Requires Node.js 22 or later. The website has no production package dependencies.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173. `dist/` contains the full static site and can be served
without Node, a database, or a server framework. Chinese routes start at `/` and
English routes at `/en/`. All article text is present in the generated HTML.

The default canonical origin is `https://nowoi.com`. Set `SITE_ORIGIN` explicitly
when generating a separate preview release. The Sites preview uses its own
private origin.

## Edit and maintain

- `src/content/`: bilingual guide content and primary reference links.
- `src/site.mjs`: page templates, shared text, and editorial/privacy pages.
- `src/labs.mjs`: accessible exercise markup.
- `src/assets/labs.js`: CSV parsing, local form feedback, budget calculations,
  and an opt-in locally saved checklist.
- `src/assets/style.css`: responsive editorial design; no remote fonts.
- `scripts/build.mjs`: exports the static pages and discovery files.
- `scripts/check.mjs`: validates routes, anchors, IDs, headings, and syntax.
- `src/advertising.mjs`: public publisher identifier; verification-only mode.

Inputs stay in the current browser. Checklist progress is stored only after an
explicit save choice. No ad or analytics scripts are loaded in this release.
Hosting can still create access/security logs; see the published privacy page.

See MONETIZATION.md before connecting live advertising. Approval and revenue are
external outcomes, not guarantees made by this code.

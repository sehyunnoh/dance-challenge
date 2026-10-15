# Dance Challenge Hub

A curated list of dance challenges (global + K-pop, trending and past hits) to learn and film at home with kids. Videos are embedded from YouTube, so nothing is hosted here.

**Live site:** https://sehyunnoh.github.io/dance-challenge/

## Features

- Challenge cards with filters: era, difficulty, number of dancers, origin
- Detail page with the video, an optional tutorial video, and a "Kid check" note
- Favorites and practice status (Not started / Practicing / Filmed), saved in the browser only (`localStorage`)
- "My list" filter for favorites and practice status
- Filming tips page with a pre-recording checklist
- Responsive layout (phone first), installable to the home screen

## Tech stack

- [Astro](https://astro.build) 7 (static output) and Tailwind CSS 4
- Content collection loaded from one JSON file, no database or server
- Fonts self-hosted with `@fontsource/baloo-2` (no requests to Google Fonts)
- Hosted on GitHub Pages, deployed by GitHub Actions
- Analytics: [GoatCounter](https://dance-challenge.goatcounter.com/) (cookieless), added only in production builds

## Getting started

Requires Node 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321/dance-challenge/
npm run build     # outputs to dist/
npm run preview   # serves the built site
```

The site lives under `/dance-challenge` (see `base` in `astro.config.mjs`), so local URLs include that prefix.

## Project structure

```
src/
  data/challenges.json     All challenge data
  content.config.ts        Schema for the data (validated at build time)
  pages/index.astro        Home: cards, filters, favorites
  pages/challenges/[id].astro   One page per challenge
  pages/tips.astro         Filming tips
  layouts/Layout.astro     Header, footer, icons, analytics
  scripts/tracker.ts       Favorites and practice status storage
  styles/global.css        Theme colors, fonts, shared styles
public/                    Icons, web manifest, Search Console verification file
.github/workflows/deploy.yml   Build and deploy to GitHub Pages
```

## Adding a challenge

Add an object to `src/data/challenges.json`. The build fails if a field is invalid.

| Field | Values |
| --- | --- |
| `id` | Unique slug, used in the URL (for example `bad-ateez`) |
| `title`, `artist` | Text |
| `youtubeId` | The 11-character ID of the main video |
| `tutorialYoutubeId` | Optional. A step-by-step or slowed-down tutorial |
| `year` | Release year of the song or challenge |
| `era` | `trending` (2025 and later) or `past` |
| `origin` | `kpop`, `tiktok`, `western`, `other` |
| `difficulty` | `easy`, `medium`, `hard` |
| `group` | `solo`, `duo`, `group` |
| `kidFriendly` | Short note shown as "Kid check". Say "Lyrics not reviewed" if you have not checked |
| `notes` | Optional extra info |
| `tags` | Optional list of words |

### Checking a YouTube ID

Confirm that the ID is the video you expect, and that it can be embedded:

```bash
curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"
```

A normal response includes the title and channel. An error (401, 404) means the video is missing or cannot be embedded. Prefer official channel uploads.

### Guidelines for this site

- The audience is kids, so skip songs with suggestive lyrics or moves, and check thumbnails too.
- Trending picks come from fan sites and news articles, not official charts. Review them now and then, since "trending" gets old.
- Do not put kids' personal details (names, school, photos, location) in this public repo.
- Do not commit API keys or tokens.

## Deploying

Pushing to `main` builds and deploys the site automatically. The workflow sets `SITE` to `https://<owner>.github.io` for correct sitemap and canonical URLs.

In the repository settings, Pages must use **GitHub Actions** as its source.

## Things to keep

- `public/google2a7f329f4ff23189.html` verifies the site in Google Search Console. Do not delete it, or the verification is lost.
- The sitemap is generated at `/dance-challenge/sitemap-index.xml` and was submitted in Search Console.

## Credits

Videos belong to their creators and are embedded through YouTube. Song and challenge names are used only to describe the videos.

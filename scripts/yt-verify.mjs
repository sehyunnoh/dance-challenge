// Checks that YouTube IDs exist and can be embedded.
// Prints: id | title | channel | upload date | length   (or "OEMBED <status>" when it fails)
// Usage: node scripts/yt-verify.mjs ID [ID...]
//        node scripts/yt-verify.mjs --all     (every ID in src/data/challenges.json)
import { readFileSync } from 'node:fs';

let ids = process.argv.slice(2);
if (ids[0] === '--all') {
  const data = JSON.parse(readFileSync(new URL('../src/data/challenges.json', import.meta.url), 'utf8'));
  ids = data.flatMap((c) => [c.youtubeId, c.tutorialYoutubeId]).filter(Boolean);
}
if (!ids.length) {
  console.error('Usage: node scripts/yt-verify.mjs ID [ID...] | --all');
  process.exit(1);
}

let failed = 0;
for (const id of ids) {
  const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
  if (oembed.status !== 200) {
    console.log(id, '| OEMBED', oembed.status);
    failed++;
    continue;
  }
  const info = await oembed.json();
  const page = await (await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  const date = (page.match(/"uploadDate":"([^"]+)"/) || [])[1]?.slice(0, 10);
  const seconds = (page.match(/"lengthSeconds":"(\d+)"/) || [])[1];
  console.log(id, '|', info.title, '|', info.author_name, '|', date, '|', `${seconds}s`);
}
process.exitCode = failed ? 1 : 0;

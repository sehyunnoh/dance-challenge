// Prints the top YouTube search results: id | title | channel | length | views
// Usage: node scripts/yt-search.mjs "ATEEZ BAD dance practice"
const query = process.argv[2];
if (!query) {
  console.error('Usage: node scripts/yt-search.mjs "<query>"');
  process.exit(1);
}

const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=en`, {
  headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'en-US' },
});
const html = await res.text();
const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!match) {
  console.error(`No result data (HTTP ${res.status}). YouTube may be blocked or changed its page.`);
  process.exitCode = 1;
} else {
  const rows = [];
  (function walk(node) {
    if (!node || typeof node !== 'object') return;
    const v = node.videoRenderer;
    if (v) {
      rows.push([v.videoId, v.title?.runs?.[0]?.text, v.ownerText?.runs?.[0]?.text, v.lengthText?.simpleText, v.viewCountText?.simpleText].join(' | '));
    }
    for (const key in node) walk(node[key]);
  })(JSON.parse(match[1]));

  console.log(rows.slice(0, 5).join('\n'));
}

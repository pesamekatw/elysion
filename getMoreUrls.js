const q = ['Mavra_Volia', 'Anavatos', 'Lithi_beach'];
Promise.all(q.map(async x => {
  const r = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + x + '&format=json').then(res => res.json());
  if (!r.query || r.query.search.length === 0) return null;
  const title = r.query.search[0].title;
  const html = await fetch('https://en.wikipedia.org/wiki/' + encodeURIComponent(title)).then(r => r.text());
  const m = html.match(/<meta property="og:image" content="([^"]+)"/);
  return m ? m[1] : null;
})).then(console.log);

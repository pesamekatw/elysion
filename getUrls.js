const urls = [
  'https://en.wikipedia.org/wiki/Nea_Moni_of_Chios',
  'https://en.wikipedia.org/wiki/Pyrgi,_Greece',
  'https://en.wikipedia.org/wiki/Mesta,_Greece',
  'https://en.wikipedia.org/wiki/Mavra_Volia',
  'https://en.wikipedia.org/wiki/Anavatos',
  'https://en.wikipedia.org/wiki/Volissos',
  'https://en.wikipedia.org/wiki/Chios'
];

Promise.all(urls.map(async u => {
  try {
    const html = await fetch(u).then(r => r.text());
    const m = html.match(/<meta property="og:image" content="([^"]+)"/);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
})).then(console.log);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const response = await fetch(
      "https://youtubetranscript.com/?server_vid2=" + videoId,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const html = await response.text();
    const matches = [...html.matchAll(/<text[^>]*>(.*?)<\/text>/gs)];

    if (!matches.length) throw new Error('No subtitles found. Try pasting the script manually.');

    const text = matches
      .map(m => m[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\n/g, ' ')
      )
      .join(' ')
      .trim();

    if (!text) throw new Error('No subtitles found. Try pasting the script manually.');
    res.status(200).json({ transcript: text });

  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not fetch transcript.' });
  }
}
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    // Get available caption tracks
    const tracksRes = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
    );
    const tracks = await tracksRes.json();

    if (!tracks.items?.length) {
      throw new Error('No subtitles available for this video.');
    }

    // Prefer French, fallback to English, then first available
    const track =
      tracks.items.find(t => t.snippet.language === 'fr') ||
      tracks.items.find(t => t.snippet.language === 'en') ||
      tracks.items[0];

    // Download the caption track
    const captionRes = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${track.id}?key=${API_KEY}`,
      { headers: { Accept: 'text/plain' } }
    );
    const text = await captionRes.text();

    if (!text || text.length < 50) throw new Error('Transcript is empty.');
    res.status(200).json({ transcript: text });

  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not fetch transcript.' });
  }
}
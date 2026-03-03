export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const response = await fetch(
      `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${videoId}&lang=fr`,
      {
        headers: {
          'x-rapidapi-host': 'youtube-transcriptor.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY
        }
      }
    );
    const data = await response.json();
    if (!data?.[0]?.transcription?.length) throw new Error('No subtitles found for this video.');
    const text = data[0].transcription.map(t => t.subtitle).join(' ');
    res.status(200).json({ transcript: text });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not fetch transcript.' });
  }
}
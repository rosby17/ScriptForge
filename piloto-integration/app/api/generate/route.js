import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ── SpeedScript config ─────────────────────────────────────

const TONES = {
  authoritative:  'Authoritative & Medical',
  storytelling:   'Storytelling & Emotional',
  energetic:      'Energetic & Motivational',
  conversational: 'Friendly & Conversational',
  educational:    'Educational & Scientific',
}

const AUDIENCES = {
  seniors:  'Seniors 60+',
  adults:   'Adults 40–60',
  general:  'General Audience',
  creators: 'Content Creators',
}

const LENGTHS = {
  short:      { label: 'Short',      desc: '3–5 min',   chars: '1,000–5,000 chars' },
  medium:     { label: 'Medium',     desc: '8–12 min',  chars: '5,000–15,000 chars' },
  long:       { label: 'Long',       desc: '15–20 min', chars: '15,000–30,000 chars' },
  extra_long: { label: 'Extra Long', desc: '25–35 min', chars: '30,000–60,000 chars' },
}

function getPartsConfig(longueur) {
  const map = {
    short: [
      { label: 'Rédaction du script...', instruction: 'Write the complete script.' },
    ],
    medium: [
      { label: 'Partie 1/2 — Accroche...', instruction: 'Write the first half. Hook, intro, first 2–3 points. End with [CONTINUE].' },
      { label: 'Partie 2/2 — Corps & CTA...', instruction: 'Continue seamlessly. Remaining points + strong CTA. Complete the script.' },
    ],
    long: [
      { label: 'Partie 1/3 — Accroche...', instruction: 'First third: hook, intro, first 2 points. End with [CONTINUE].' },
      { label: 'Partie 2/3 — Développement...', instruction: 'Continue: 3–4 more points, studies, patient stories. End with [CONTINUE].' },
      { label: 'Partie 3/3 — Conclusion...', instruction: 'Final: myths, bonus, strong CTA. Complete.' },
    ],
    extra_long: [
      { label: 'Partie 1/4 — Ouverture...', instruction: 'First quarter: hook, story, 2 deep points. End with [CONTINUE].' },
      { label: 'Partie 2/4 — Approfondissement...', instruction: 'Continue: 3–4 points with science & cases. End with [CONTINUE].' },
      { label: 'Partie 3/4 — Suite...', instruction: 'Continue: 3–4 more points, myths. End with [CONTINUE].' },
      { label: 'Partie 4/4 — Clôture...', instruction: 'Final: bonus secret, conclusion, multi-step CTA. Complete.' },
    ],
  }
  return map[longueur] || map.medium
}

async function claudeCall(messages, maxTokens = 4000) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages,
    }),
  })
  const data = await res.json()
  return data.content?.[0]?.text || null
}

// ── Helpers ────────────────────────────────────────────────

async function genererScriptIA(contenu, duree) {
  const mots = duree === '60' ? 120 : duree === '180' ? 360 : 1200
  const text = await claudeCall([{
    role: 'user',
    content: `Tu es un expert en création de contenu YouTube viral. Génère un script parlé naturel et engageant d'environ ${mots} mots (${duree} secondes). Le script doit être direct, sans introduction longue, adapté à un avatar IA qui parle face caméra. Retourne UNIQUEMENT le texte du script, sans titre ni mise en forme.\n\nContenu source :\n\n${contenu}`,
  }], 2000)
  return text || contenu
}

async function genererScriptSpeedScript({ contenu, titre, tone, audience, niche, longueur }) {
  const lc = LENGTHS[longueur] || LENGTHS.medium
  const toneLabel = TONES[tone] || tone || 'Friendly & Conversational'
  const audienceLabel = AUDIENCES[audience] || audience || 'General Audience'
  const parts = getPartsConfig(longueur)

  const ctx = `Expert YouTube scriptwriter — viral, emotional content.
SOURCE: ${titre || 'Contenu YouTube'}
${contenu.slice(0, 2000)}
STYLE: ${niche || 'General'} | ${toneLabel} | ${audienceLabel}
LENGTH: ${lc.label} (${lc.chars})
RULES: Use "tu". Short punchy sentences. Real studies (country/participants/duration/results). Natural transitions. NO Part labels. Strong CTA. Note informational purpose. NO headers/bullets/emojis/directions. 100% original.`

  const history = []
  let full = ''

  for (let i = 0; i < parts.length; i++) {
    const msg = i === 0
      ? `${ctx}\n\nINSTRUCTION: ${parts[i].instruction}\n\nStart directly with the hook.`
      : `INSTRUCTION: ${parts[i].instruction}\nContinue seamlessly.`

    history.push({ role: 'user', content: msg })
    const text = await claudeCall(history, 4000)
    if (!text) throw new Error(`SpeedScript: partie ${i + 1} échouée`)

    const cleaned = text.replace(/\[CONTINUE\]/gi, '').trim()
    full += (i > 0 ? '\n\n' : '') + cleaned
    history.push({ role: 'assistant', content: text })
  }

  return full
}

async function genererMetadonnees(script) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Expert YouTube. Génère titre viral (max 80 chars) + description SEO (max 300 chars) en français.\n\nScript: ${script.substring(0, 500)}\n\nJSON uniquement: {"titre":"...","description":"..."}`
      }]
    })
  })
  const data = await res.json()
  const text = data.content?.[0]?.text || '{}'
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return { titre: 'Ma vidéo Piloto', description: '' }
  }
}

async function creerVideoHeygen(script, avatarId, voiceId, heygenKey) {
  // HeyGen limite le texte à 5000 caractères par segment
  // Si le script est long, on l'envoie en un seul bloc (truncated si nécessaire)
  const scriptFinal = script.substring(0, 4900)

  const res = await fetch('https://api.heygen.com/v2/video/generate', {
    method: 'POST',
    headers: {
      'X-Api-Key': heygenKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      video_inputs: [{
        character: {
          type: 'avatar',
          avatar_id: avatarId,
          avatar_style: 'normal'
        },
        voice: {
          type: 'text',
          input_text: scriptFinal,
          voice_id: voiceId,
          speed: 1.0,
        },
        background: {
          type: 'color',
          value: '#FAFAFA'
        }
      }],
      dimension: { width: 1280, height: 720 },
      aspect_ratio: null,
    })
  })

  const data = await res.json()

  // Log pour debug en cas d'erreur
  if (!data?.data?.video_id) {
    console.error('HeyGen response:', JSON.stringify(data))
    throw new Error(`Heygen erreur: ${data?.message || data?.error || JSON.stringify(data)}`)
  }

  return data.data.video_id
}

async function attendreVideoHeygen(videoId, heygenKey, maxTentatives = 60) {
  for (let i = 0; i < maxTentatives; i++) {
    await new Promise(r => setTimeout(r, 15000)) // attend 15s entre chaque check

    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { 'X-Api-Key': heygenKey }
    })
    const data = await res.json()
    const status = data?.data?.status

    console.log(`HeyGen status [${i + 1}/${maxTentatives}]: ${status}`)

    if (status === 'completed') return data.data.video_url
    if (status === 'failed') {
      throw new Error(`Heygen failed: ${JSON.stringify(data.data.error || data.data)}`)
    }
    // pending / processing → on continue
  }
  throw new Error('Timeout: la vidéo HeyGen prend trop longtemps (>15 min)')
}

async function uploaderSurYoutube({ videoUrl, titre, description, channelData, datePublication }) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    `${process.env.NEXTAUTH_URL}/api/auth/youtube/callback`
  )

  oauth2Client.setCredentials({
    access_token: channelData.access_token,
    refresh_token: channelData.refresh_token,
  })

  // Télécharge la vidéo HeyGen en mémoire
  const videoRes = await fetch(videoUrl)
  const videoBuffer = await videoRes.arrayBuffer()
  const videoStream = Buffer.from(videoBuffer)

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client })

  const uploadRes = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: titre || 'Ma vidéo Piloto',
        description: description || '',
        tags: ['IA', 'Piloto', 'YouTube automation'],
        categoryId: '22',
        defaultLanguage: 'fr',
      },
      status: {
        privacyStatus: datePublication ? 'private' : 'public',
        publishAt: datePublication || undefined,
      }
    },
    media: {
      mimeType: 'video/mp4',
      body: require('stream').Readable.from(videoStream),
    }
  })

  return uploadRes.data.id
}

// ── Route POST principale ──────────────────────────────────

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      userId,
      contenu,
      duree,
      avatarId,
      voiceId,
      heygenKey,
      titre: titreManuel,
      description: descriptionManuelle,
      chaineId,
      datePublication,
      scriptDirect, // true si le client colle son propre script final
      speedscript,  // true pour utiliser la génération SpeedScript avancée
      tone,
      audience,
      niche,
      longueur,
    } = body

    if (!userId || !contenu || !avatarId || !voiceId || !heygenKey || !chaineId) {
      return Response.json({ error: 'Paramètres manquants' }, { status: 400 })
    }

    // Récupère les infos de la chaîne (tokens OAuth)
    const { data: chaineData, error: chaineError } = await supabase
      .from('youtube_channels')
      .select('*')
      .eq('id', chaineId)
      .eq('user_id', userId)
      .single()

    if (chaineError || !chaineData) {
      return Response.json({ error: 'Chaîne introuvable' }, { status: 404 })
    }

    // Crée l'entrée vidéo en base
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({
        user_id: userId,
        channel_id: chaineData.channel_id,
        script: contenu,
        duree: parseInt(duree),
        statut: scriptDirect ? 'generation_video' : 'generation_script',
        date_publication: datePublication || null,
      })
      .select()
      .single()

    if (videoError) {
      return Response.json({ error: 'Erreur création vidéo' }, { status: 500 })
    }

    const videoDbId = video.id

    // Lance le pipeline en arrière-plan
    runPipeline({
      videoDbId, userId, contenu, duree, avatarId, voiceId, heygenKey,
      titreManuel, descriptionManuelle, chaineData, datePublication,
      scriptDirect: !!scriptDirect,
      speedscript: !!speedscript,
      tone, audience, niche, longueur,
    }).catch(async (err) => {
      console.error('Pipeline error:', err)
      await supabase.from('videos').update({ statut: 'erreur' }).eq('id', videoDbId)
    })

    return Response.json({ success: true, videoId: videoDbId })

  } catch (err) {
    console.error(err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

// ── Pipeline complet ───────────────────────────────────────

async function runPipeline({
  videoDbId, userId, contenu, duree,
  avatarId, voiceId, heygenKey,
  titreManuel, descriptionManuelle,
  chaineData, datePublication,
  scriptDirect, speedscript,
  tone, audience, niche, longueur,
}) {
  const update = (statut, extra = {}) =>
    supabase.from('videos').update({ statut, ...extra }).eq('id', videoDbId)

  let script

  if (scriptDirect) {
    // Script fourni directement par l'utilisateur
    script = contenu
    await update('script_pret', { script })
  } else if (speedscript) {
    // Génération SpeedScript avancée — multi-parties, ton/audience/niche personnalisés
    await update('generation_script')
    script = await genererScriptSpeedScript({
      contenu,
      titre: titreManuel,
      tone,
      audience,
      niche,
      longueur: longueur || 'medium',
    })
    await update('script_pret', { script })
  } else {
    // Génération IA simple depuis le contenu/idée
    await update('generation_script')
    script = await genererScriptIA(contenu, duree)
    await update('script_pret', { script })
  }

  // Génère titre + description si non fournis
  let titre = titreManuel
  let description = descriptionManuelle
  if (!titre || !description) {
    await update('generation_meta')
    const meta = await genererMetadonnees(script)
    titre = titre || meta.titre
    description = description || meta.description
  }
  await update('meta_pret', { titre, description })

  // Envoie à HeyGen
  await update('generation_video')
  const heygenVideoId = await creerVideoHeygen(script, avatarId, voiceId, heygenKey)
  await update('video_en_cours', { heygen_video_id: heygenVideoId })

  // Attend la fin de génération HeyGen (polling)
  const videoUrl = await attendreVideoHeygen(heygenVideoId, heygenKey)

  // Vidéo prête — on s'arrête ici, la publication est manuelle
  await update('video_prete', { thumbnail_url: videoUrl })
}
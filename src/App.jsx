import { useState } from "react";

const C = {
  bg:        "#0d1f0f",
  bgCard:    "#0a1a0c",
  bgInput:   "#0f2212",
  green:     "#1a3d1f",
  greenMid:  "#2d6e35",
  greenLight:"#4ade80",
  greenPale: "#bbf7d0",
  red:       "#ef4444",
  yellow:    "#fde047",
  white:     "#f0fdf4",
  muted:     "#6b7f6e",
  border:    "#1e3a22",
};

const Icon = ({ name, size=16, color="currentColor", style={} }) => {
  const s = { width:size, height:size, display:"inline-block", flexShrink:0, ...style };
  const icons = {
    link: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    fileText: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    cpu: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    arrowRight: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    zap: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    target: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    alignLeft: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>,
    stethoscope: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
    bookOpen: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    flame: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    messageCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    graduationCap: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    users: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    user: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    camera: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    star: <svg style={s} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    lightbulb: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
    download: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    copy: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    plus: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    chevronLeft: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    pencil: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    clock: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    barChart: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    play: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    rocket: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    globe: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    video: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  };
  return icons[name] || null;
};

const TONES = [
  { id: "authoritative", label: "Authoritative & Medical", icon: "stethoscope" },
  { id: "storytelling",  label: "Storytelling & Emotional", icon: "bookOpen" },
  { id: "energetic",     label: "Energetic & Motivational", icon: "flame" },
  { id: "conversational",label: "Friendly & Conversational", icon: "messageCircle" },
  { id: "educational",   label: "Educational & Scientific",  icon: "graduationCap" },
];
const AUDIENCES = [
  { id: "seniors", label: "Seniors 60+", icon: "user" },
  { id: "adults",  label: "Adults 40–60", icon: "users" },
  { id: "general", label: "General Audience", icon: "globe" },
  { id: "creators",label: "Content Creators", icon: "camera" },
];
const LENGTHS = [
  { id: "short",      label: "Short",      desc: "3–5 min",   chars: "1,000–5,000 chars" },
  { id: "medium",     label: "Medium",     desc: "8–12 min",  chars: "5,000–15,000 chars" },
  { id: "long",       label: "Long",       desc: "15–20 min", chars: "15,000–30,000 chars" },
  { id: "extra_long", label: "Extra Long", desc: "25–35 min", chars: "30,000–60,000 chars" },
];
const NICHES = [
  "Health & Wellness","Finance & Money","Personal Development",
  "Nutrition & Diet","Mental Health","Fitness & Sport",
  "Technology","Spirituality","Relationships","Business",
];

function extractVideoId(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
  return m ? m[1] : null;
}

export default function App() {
  const [step, setStep]               = useState(0);
  const [sourceMode, setSourceMode]   = useState(null);
  const [youtubeUrl, setYoutubeUrl]   = useState("");
  const [manualScript, setManualScript] = useState("");
  const [manualTitle, setManualTitle] = useState("");
  const [extractedTranscript, setExtractedTranscript] = useState("");
  const [extracting, setExtracting]   = useState(false);
  const [extractError, setExtractError] = useState("");
  const [analyzing, setAnalyzing]     = useState(false);
  const [analysis, setAnalysis]       = useState(null);
  const [channelName, setChannelName] = useState("");
  const [selectedTone, setSelectedTone]     = useState("authoritative");
  const [selectedAudience, setSelectedAudience] = useState("seniors");
  const [selectedNiche, setSelectedNiche]   = useState("");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [newTitle, setNewTitle]       = useState("");
  const [result, setResult]           = useState("");
  const [loading, setLoading]         = useState(false);
  const [progress, setProgress]       = useState({ current:0, total:0, label:"" });
  const [error, setError]             = useState("");
  const [copied, setCopied]           = useState(false);

  const sourceScript = sourceMode === "url" ? extractedTranscript : manualScript;
  const sourceTitle  = sourceMode === "url" ? `YouTube: ${youtubeUrl}` : manualTitle;
  const canNext1     = sourceScript.length > 100;

  function getPartsConfig(id) {
    const map = {
      short:      [{ label:"Writing script...", instruction:"Write the complete script." }],
      medium:     [
        { label:"Part 1/2 — Hook & opening...",  instruction:"Write the first half. Hook, intro, first 2–3 points. End with [CONTINUE]." },
        { label:"Part 2/2 — Core & CTA...",       instruction:"Continue seamlessly. Remaining points + strong CTA. Complete the script." },
      ],
      long:       [
        { label:"Part 1/3 — Hook...",   instruction:"First third: hook, intro, first 2 points. End with [CONTINUE]." },
        { label:"Part 2/3 — Core...",   instruction:"Continue: 3–4 more points, studies, patient stories. End with [CONTINUE]." },
        { label:"Part 3/3 — Close...",  instruction:"Final: myths, bonus, strong CTA. Complete." },
      ],
      extra_long: [
        { label:"Part 1/4 — Opening...",   instruction:"First quarter: hook, story, 2 deep points. End with [CONTINUE]." },
        { label:"Part 2/4 — Deep dive...", instruction:"Continue: 3–4 points with science & cases. End with [CONTINUE]." },
        { label:"Part 3/4 — More depth...",instruction:"Continue: 3–4 more points, myths. End with [CONTINUE]." },
        { label:"Part 4/4 — Closing...",   instruction:"Final: bonus secret, conclusion, multi-step CTA. Complete." },
      ],
    };
    return map[id] || map.short;
  }

  async function analyzeScript() {
    setAnalyzing(true); setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{
          "Content-Type":"application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800,
          messages:[{ role:"user", content:`Analyze this YouTube script. Return ONLY valid JSON, no markdown:\n\n${sourceScript.slice(0,3000)}\n\n{"niche":"one of: Health & Wellness, Finance & Money, Personal Development, Nutrition & Diet, Mental Health, Fitness & Sport, Technology, Spirituality, Relationships, Business","tone":"one of: authoritative, storytelling, energetic, conversational, educational","audience":"one of: seniors, adults, general, creators","channel_style":"2-sentence description","hook_type":"stat|question|story|controversy|promise","suggested_title":"improved viral title"}` }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setAnalysis(parsed);
      setSelectedTone(parsed.tone || "authoritative");
      setSelectedAudience(parsed.audience || "seniors");
      setSelectedNiche(parsed.niche || "Health & Wellness");
      if (parsed.suggested_title) setNewTitle(parsed.suggested_title);
      setStep(2);
    } catch { setError("Analysis failed. Continue manually."); setStep(2); }
    setAnalyzing(false);
  }

  async function generate() {
    setLoading(true); setError(""); setResult("");
    const lc = LENGTHS.find(l=>l.id===selectedLength);
    const tc = TONES.find(t=>t.id===selectedTone);
    const ac = AUDIENCES.find(a=>a.id===selectedAudience);
    const parts = getPartsConfig(selectedLength);
    setProgress({ current:0, total:parts.length, label:"Starting..." });
    const ctx = `Expert YouTube scriptwriter — viral, emotional content.\nSOURCE: ${sourceTitle}\n${sourceScript.slice(0,2000)}\nSTYLE: ${selectedNiche} | ${tc?.label} | ${ac?.label}\nCHANNEL: ${channelName}\nTITLE: "${newTitle}" | LENGTH: ${lc?.label} (${lc?.chars})\nRULES: Use "tu". Short punchy sentences. Real studies (country/participants/duration/results). Patient stories. Natural transitions. NO Part labels. Strong CTA. Note informational purpose. NO headers/bullets/emojis/directions. 100% original.`;
    try {
      const history = []; let full = "";
      for (let i=0; i<parts.length; i++) {
        setProgress({ current:i+1, total:parts.length, label:parts[i].label });
        const msg = i===0 ? `${ctx}\n\nINSTRUCTION: ${parts[i].instruction}\n\nStart directly with the hook.`
                           : `INSTRUCTION: ${parts[i].instruction}\nContinue seamlessly.`;
        history.push({ role:"user", content:msg });
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{
            "Content-Type":"application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4000, messages:history })
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || null;
        if (!text) throw new Error(`Part ${i+1} failed`);
        const cleaned = text.replace(/\[CONTINUE\]/gi,"").trim();
        full += (i>0?"\n\n":"")+cleaned;
        history.push({ role:"assistant", content:text });
      }
      setResult(full); setStep(3);
    } catch(e) { setError(e.message||"Generation failed."); }
    setLoading(false); setProgress({ current:0, total:0, label:"" });
  }

  function download() {
    const blob = new Blob([result], { type:"text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${newTitle || "script"}.txt`;
    a.click();
  }

  function copy() { navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),2000); }
  function reset() {
    setStep(0); setResult(""); setError(""); setAnalysis(null);
    setSourceMode(null); setYoutubeUrl(""); setManualScript(""); setManualTitle("");
    setExtractedTranscript(""); setExtractError(""); setChannelName(""); setNewTitle("");
    setSelectedTone("authoritative"); setSelectedAudience("seniors"); setSelectedNiche(""); setSelectedLength("medium");
  }

  const words = result.split(/\s+/).filter(Boolean).length;
  const mins  = Math.round(words/140);
  const pct   = progress.total ? Math.round((progress.current/progress.total)*100) : 0;

  const pill = (active, color="green") => ({
    padding:"8px 18px", borderRadius:99, fontSize:13, cursor:"pointer", fontWeight:600,
    border: active ? `1.5px solid ${color==="red"?C.red:C.greenLight}` : `1px solid ${C.border}`,
    background: active ? (color==="red"?"#ef444420":"#4ade8020") : C.bgInput,
    color: active ? (color==="red"?C.red:C.greenLight) : C.muted,
    transition:"all 0.18s",
    display:"flex", alignItems:"center", gap:6,
  });

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.white, fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color:#3a5a3e; }
        textarea, input { color-scheme: dark; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .btn-red:hover { background:#dc2626 !important; transform:translateY(-1px); box-shadow:0 8px 24px #ef444440 !important; }
        .btn-green:hover { background:#166534 !important; transform:translateY(-1px); }
        .mode-card:hover { border-color:#4ade8066 !important; background:#0f2212 !important; transform:translateY(-2px); box-shadow:0 12px 32px #00000060 !important; }
        .chip:hover { border-color:#4ade8044 !important; color:#a0f0b0 !important; }
        .logo-btn:hover { opacity:0.8; }
      `}</style>

      <nav style={{ padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, background:C.bgCard }}>
        <div onClick={reset} className="logo-btn" style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${C.greenLight},#22c55e)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="pencil" size={16} color={C.bgCard} />
          </div>
          <span style={{ fontWeight:800, fontSize:17, color:C.white, letterSpacing:"-0.3px" }}>Script<span style={{ color:C.greenLight }}>Forge</span></span>
        </div>
        {step > 0 && step < 3 && (
          <div style={{ display:"flex", gap:6 }}>
            {["Source","Profile","Generate"].map((s,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:22, height:22, borderRadius:99, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
                    background: step-1>i ? C.greenLight : step-1===i ? C.greenMid : C.border,
                    color: step-1>i ? C.bgCard : C.white }}>
                    {step-1>i ? <Icon name="check" size={12} color={C.bgCard} /> : i+1}
                  </div>
                  <span style={{ fontSize:12, color: step-1>=i ? C.greenPale : C.muted }}>{s}</span>
                </div>
                {i<2 && <div style={{ width:20, height:1, background:step-1>i?C.greenMid:C.border, margin:"0 2px" }} />}
              </div>
            ))}
          </div>
        )}
        <button onClick={reset} style={{ fontSize:12, color:C.muted, background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6, opacity: step > 0 ? 1 : 0, pointerEvents: step > 0 ? "auto" : "none" }}>
          <Icon name="chevronLeft" size={13} color={C.muted} /> Accueil
        </button>
      </nav>

      {step===0 && (
        <div style={{ animation:"fadeUp 0.5s ease" }}>
          <div style={{ textAlign:"center", padding:"72px 24px 48px", maxWidth:720, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:99, padding:"6px 16px", marginBottom:24 }}>
              {[0,1,2,3,4].map(i=><Icon key={i} name="star" size={12} color={C.yellow} />)}
              <span style={{ fontSize:12, color:C.muted, marginLeft:4 }}>Trusted by 2,400+ creators</span>
            </div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${C.greenLight}20`, border:`1px solid ${C.greenLight}44`, borderRadius:99, padding:"4px 14px", fontSize:12, color:C.greenLight, fontWeight:600, marginBottom:20, letterSpacing:"0.5px" }}>
              <Icon name="zap" size={11} color={C.greenLight} /> AI-POWERED YOUTUBE SCRIPT TOOL
            </div>

            <h1 style={{ fontSize:52, fontWeight:900, lineHeight:1.08, letterSpacing:"-1.5px", marginBottom:20, textTransform:"uppercase" }}>
              <span style={{ color:C.white }}>TURN ANY VIDEO INTO</span><br/>
              <span style={{ color:C.greenLight }}>YOUR VIRAL SCRIPT</span><br/>
              <span style={{ color:C.white }}>IN MINUTES</span>
            </h1>

            <p style={{ fontSize:17, color:C.muted, maxWidth:480, margin:"0 auto 36px", lineHeight:1.65 }}>
              Paste a YouTube link or script — our AI analyzes the style, adapts it to your channel, and generates a full original script ready to record.
            </p>

            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-red" onClick={()=>setStep(1)} style={{ background:C.red, color:"#fff", border:"none", borderRadius:99, padding:"16px 36px", fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 20px ${C.red}50`, transition:"all 0.2s", display:"flex", alignItems:"center", gap:10 }}>
                Generate My Script <Icon name="arrowRight" size={16} color="#fff" />
              </button>
              <button className="btn-green" onClick={()=>setStep(1)} style={{ background:C.green, color:C.greenLight, border:`1.5px solid ${C.greenMid}`, borderRadius:99, padding:"16px 36px", fontSize:16, fontWeight:600, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", gap:10 }}>
                <Icon name="play" size={15} color={C.greenLight} /> Watch Demo
              </button>
            </div>
          </div>

          <div style={{ maxWidth:840, margin:"0 auto 56px", padding:"0 24px" }}>
            <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:24, padding:"40px", boxShadow:"0 32px 80px #00000080", position:"relative", overflow:"hidden" }}>
              {[
                { icon:"video",    top:20,        left:20,  rot:-12 },
                { icon:"pencil",   top:16,        right:28, rot:8 },
                { icon:"barChart", bottom:24,     left:32,  rot:6 },
                { icon:"rocket",   bottom:20,     right:24, rot:-8 },
              ].map((f,i)=>(
                <div key={i} style={{ position:"absolute", top:f.top, bottom:f.bottom, left:f.left, right:f.right, width:44, height:44, borderRadius:12, background:C.green, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", transform:`rotate(${f.rot}deg)`, boxShadow:"0 4px 16px #00000060" }}>
                  <Icon name={f.icon} size={20} color={C.greenLight} />
                </div>
              ))}

              <div style={{ textAlign:"center", padding:"16px 0" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
                  {[
                    { icon:"link",     label:"YouTube URL\nor Script",     color:C.greenMid },
                    { isArrow:true },
                    { icon:"cpu",      label:"AI Analysis\n& Style Match", color:C.yellow, textColor:C.bgCard },
                    { isArrow:true },
                    { icon:"fileText", label:"Your Original\nViral Script", color:C.red },
                  ].map((b,i)=> b.isArrow
                    ? <Icon key={i} name="arrowRight" size={22} color={C.muted} />
                    : (
                      <div key={i} style={{ background:b.color, borderRadius:16, padding:"16px 20px", minWidth:120, textAlign:"center", boxShadow:"0 8px 24px #00000050", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                        <Icon name={b.icon} size={28} color={b.textColor||C.bgCard} />
                        <div style={{ fontSize:11, fontWeight:700, color:b.textColor||C.bgCard, lineHeight:1.4, whiteSpace:"pre" }}>{b.label}</div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div style={{ background:C.yellow, borderRadius:14, padding:"14px 20px", marginTop:28, display:"flex", alignItems:"flex-start", gap:12 }}>
                <Icon name="lightbulb" size={20} color={C.bgCard} style={{ marginTop:1, flexShrink:0 }} />
                <span style={{ fontSize:13, fontWeight:700, color:C.bgCard, lineHeight:1.5 }}>
                  ScriptForge auto-detects niche, tone & audience from your source — then builds a 100% original script adapted to your channel identity.
                </span>
              </div>
            </div>
          </div>

          <div style={{ maxWidth:840, margin:"0 auto 80px", padding:"0 24px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { icon:"zap",       title:"Auto-Detection", desc:"We analyze style, tone & niche automatically from any source script.", color:C.greenLight },
              { icon:"target",    title:"Any Niche",      desc:"Health, finance, fitness, tech — works for every YouTube vertical.",  color:C.yellow },
              { icon:"alignLeft", title:"Any Length",     desc:"From 3-min shorts to 35-min deep dives — fully automated multi-part generation.", color:C.red },
            ].map((b,i)=>(
              <div key={i} style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:20, padding:"28px 22px", boxShadow:"0 8px 32px #00000050" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${b.color}20`, border:`1px solid ${b.color}44`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                  <Icon name={b.icon} size={20} color={b.color} />
                </div>
                <div style={{ fontWeight:800, fontSize:15, marginBottom:8, color:C.white }}>{b.title}</div>
                <div style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step>0 && step<3 && (
        <div style={{ maxWidth:680, margin:"0 auto", padding:"40px 20px", animation:"fadeUp 0.4s ease" }}>

          {step===1 && (
            <div>
              <SectionHeader title="What's your source?" sub="Paste a YouTube URL or your script — we'll handle the rest." />

              {!sourceMode && (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:4 }}>
                  {[
                    { mode:"url",  icon:"link",     title:"YouTube Link", desc:"Paste a URL and we extract the transcript automatically." },
                    { mode:"text", icon:"fileText",  title:"Paste Script", desc:"You already have the script. Drop it in directly." },
                  ].map(m=>(
                    <div key={m.mode} className="mode-card" onClick={()=>setSourceMode(m.mode)} style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:20, padding:"28px 22px", cursor:"pointer", textAlign:"center", transition:"all 0.2s", boxShadow:"0 4px 20px #00000040" }}>
                      <div style={{ width:48, height:48, borderRadius:14, background:`${C.greenLight}15`, border:`1px solid ${C.greenLight}30`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                        <Icon name={m.icon} size={22} color={C.greenLight} />
                      </div>
                      <div style={{ fontWeight:800, fontSize:15, color:C.white, marginBottom:8 }}>{m.title}</div>
                      <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{m.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {sourceMode==="url" && (
                <div>
                  <BackBtn onClick={()=>{ setSourceMode(null); setExtractedTranscript(""); setExtractError(""); }} />
                  <Label>YouTube Video URL</Label>
                  <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                    <Input value={youtubeUrl} onChange={e=>{ setYoutubeUrl(e.target.value); setExtractedTranscript(""); setExtractError(""); }} placeholder="https://youtube.com/watch?v=..." style={{ flex:1, marginBottom:0 }} />
                    <button onClick={()=>{ if(!extractVideoId(youtubeUrl)){ setExtractError("Invalid URL."); return; } setExtracting(true); setTimeout(()=>{ setExtractError("Auto-extraction requires a backend. Please paste the transcript below."); setSourceMode("text"); setExtracting(false); },1400); }}
                      disabled={!youtubeUrl.trim()||extracting}
                      style={{ background:C.greenMid, color:C.white, border:"none", borderRadius:12, padding:"0 20px", fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap", opacity:youtubeUrl.trim()?1:0.4, display:"flex", alignItems:"center", gap:8 }}>
                      {extracting ? <Spin /> : <><Icon name="search" size={14} color="#fff" /> Extract</>}
                    </button>
                  </div>
                  {extractError && <ErrBox>{extractError}</ErrBox>}
                  {extractedTranscript && <div style={{ color:C.greenLight, fontSize:12, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><Icon name="check" size={13} color={C.greenLight} /> Transcript ready — {extractedTranscript.length} chars</div>}
                </div>
              )}

              {sourceMode==="text" && (
                <div>
                  <BackBtn onClick={()=>{ setSourceMode(null); setManualScript(""); setManualTitle(""); }} />
                  <Label>Video Title <Opt /></Label>
                  <Input value={manualTitle} onChange={e=>setManualTitle(e.target.value)} placeholder="e.g. 6 Foods That Fight Cancer" />
                  <Label>Script or Transcript <Req /></Label>
                  <Input as="textarea" value={manualScript} onChange={e=>setManualScript(e.target.value)} placeholder="Paste the full script here..." style={{ height:200, resize:"vertical" }} />
                  <div style={{ fontSize:11, color:C.muted, marginTop:-12, marginBottom:4 }}>{manualScript.length} chars — min 100</div>
                </div>
              )}

              {error && <ErrBox>{error}</ErrBox>}

              {sourceMode && (
                <button className="btn-red" onClick={analyzeScript} disabled={!canNext1||analyzing}
                  style={{ background:canNext1&&!analyzing?C.red:"#3a1a1a", color:canNext1&&!analyzing?"#fff":"#555", border:"none", borderRadius:99, padding:"15px 32px", fontSize:15, fontWeight:700, cursor:canNext1&&!analyzing?"pointer":"not-allowed", width:"100%", marginTop:16, transition:"all 0.2s", boxShadow:canNext1&&!analyzing?`0 4px 20px ${C.red}40`:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  {analyzing ? <Row><Spin/>Analyzing style & structure...</Row> : <><Icon name="search" size={16} color={canNext1?"#fff":"#555"} /> Analyze & Continue</>}
                </button>
              )}
            </div>
          )}

          {step===2 && (
            <div>
              <SectionHeader title="Confirm your profile" sub="We detected everything automatically — just confirm or adjust." />

              {analysis && (
                <div style={{ background:C.bgCard, border:`1.5px solid ${C.greenMid}44`, borderRadius:20, padding:"20px 24px", marginBottom:28, boxShadow:"0 4px 20px #00000040" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <div style={{ background:`${C.greenLight}20`, borderRadius:99, padding:"3px 12px", fontSize:11, color:C.greenLight, fontWeight:700, letterSpacing:"0.5px", display:"inline-flex", alignItems:"center", gap:6 }}>
                      <Icon name="zap" size={10} color={C.greenLight} /> AUTO-DETECTED
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:analysis.channel_style?12:0 }}>
                    {[["Niche",analysis.niche],["Tone",analysis.tone],["Audience",analysis.audience],["Hook",analysis.hook_type]].map(([k,v])=>(
                      <div key={k} style={{ background:C.bgInput, borderRadius:10, padding:"10px 14px" }}>
                        <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:3 }}>{k}</div>
                        <div style={{ fontSize:13, color:C.greenLight, fontWeight:700, textTransform:"capitalize" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {analysis.channel_style && (
                    <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12, fontSize:12, color:C.muted, lineHeight:1.65 }}>
                      <span style={{ fontWeight:600 }}>Style detected: </span>{analysis.channel_style}
                    </div>
                  )}
                </div>
              )}

              <Label>Your Channel Name <Req /></Label>
              <Input value={channelName} onChange={e=>setChannelName(e.target.value)} placeholder="e.g. Next Age Health, Finance Lab..." />

              <Label>New Video Title <Req /></Label>
              <Input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="AI suggested title above — edit freely" />

              <Label>Niche</Label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
                {NICHES.map(n=>(
                  <div key={n} className="chip" onClick={()=>setSelectedNiche(n)} style={pill(selectedNiche===n)}>
                    {selectedNiche===n && <Icon name="check" size={11} color={C.greenLight} />}
                    {n}
                  </div>
                ))}
              </div>

              <Label>Tone</Label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:22 }}>
                {TONES.map(t=>(
                  <div key={t.id} onClick={()=>setSelectedTone(t.id)} style={{ ...pill(selectedTone===t.id), borderRadius:14, padding:"11px 14px" }}>
                    <Icon name={t.icon} size={17} color={selectedTone===t.id ? C.greenLight : C.muted} />
                    <span style={{ fontSize:12 }}>{t.label}</span>
                  </div>
                ))}
              </div>

              <Label>Target Audience</Label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
                {AUDIENCES.map(a=>(
                  <div key={a.id} className="chip" onClick={()=>setSelectedAudience(a.id)} style={pill(selectedAudience===a.id,"red")}>
                    <Icon name={a.icon} size={13} color={selectedAudience===a.id ? C.red : C.muted} />
                    {a.label}
                  </div>
                ))}
              </div>

              <Label>Script Length</Label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:28 }}>
                {LENGTHS.map(l=>(
                  <div key={l.id} onClick={()=>setSelectedLength(l.id)} style={{ background:selectedLength===l.id?`${C.greenLight}15`:C.bgCard, border:`1.5px solid ${selectedLength===l.id?C.greenLight:C.border}`, borderRadius:16, padding:"14px 16px", cursor:"pointer", transition:"all 0.18s" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <Icon name="clock" size={13} color={selectedLength===l.id?C.greenLight:C.muted} />
                        <span style={{ fontWeight:800, fontSize:14, color:selectedLength===l.id?C.greenLight:C.white }}>{l.label}</span>
                      </div>
                      <span style={{ fontSize:10, background:C.bgInput, color:selectedLength===l.id?C.greenLight:C.muted, borderRadius:99, padding:"2px 8px" }}>{l.desc}</span>
                    </div>
                    <div style={{ fontSize:11, color:selectedLength===l.id?`${C.greenLight}99`:C.muted }}>{l.chars}</div>
                  </div>
                ))}
              </div>

              {error && <ErrBox>{error}</ErrBox>}

              {loading && progress.total>0 && (
                <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:16, padding:"18px 20px", marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontSize:13, color:C.greenLight, fontWeight:600 }}>{progress.label}</span>
                    <span style={{ fontSize:12, color:C.muted }}>{pct}%</span>
                  </div>
                  <div style={{ height:8, background:C.green, borderRadius:99, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${C.greenLight},#22c55e)`, width:`${pct}%`, transition:"width 0.5s ease" }} />
                  </div>
                  <div style={{ marginTop:10, fontSize:11, color:C.muted, display:"flex", alignItems:"center", gap:6 }}>
                    <Icon name="pencil" size={11} color={C.muted} /> Auto-generating all parts — no action needed...
                  </div>
                </div>
              )}

              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>setStep(1)} className="btn-green" style={{ background:C.green, color:C.greenLight, border:`1px solid ${C.greenMid}`, borderRadius:99, padding:"14px 22px", fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", gap:8 }}>
                  <Icon name="chevronLeft" size={15} color={C.greenLight} /> Back
                </button>
                <button onClick={generate} disabled={!channelName.trim()||!newTitle.trim()||loading} className={channelName.trim()&&newTitle.trim()&&!loading?"btn-red":""}
                  style={{ flex:1, background:channelName.trim()&&newTitle.trim()&&!loading?C.red:"#2a1010", color:channelName.trim()&&newTitle.trim()&&!loading?"#fff":"#553333", border:"none", borderRadius:99, padding:"14px 24px", fontSize:15, fontWeight:700, cursor:channelName.trim()&&newTitle.trim()&&!loading?"pointer":"not-allowed", transition:"all 0.2s", boxShadow:channelName.trim()&&newTitle.trim()&&!loading?`0 4px 20px ${C.red}40`:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  {loading ? <Row><Spin/>Generating your script...</Row> : <><Icon name="zap" size={16} color={channelName.trim()&&newTitle.trim()?"#fff":"#553333"} /> Generate Full Script</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {step===3 && result && (
        <div style={{ maxWidth:800, margin:"0 auto", padding:"40px 20px", animation:"fadeUp 0.4s ease" }}>
          <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:20, padding:"20px 24px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ fontWeight:800, fontSize:18, marginBottom:6, display:"flex", alignItems:"center", gap:8 }}>
                <Icon name="check" size={18} color={C.greenLight} /> Script Ready
              </div>
              <div style={{ display:"flex", gap:14, fontSize:12, color:C.muted, flexWrap:"wrap" }}>
                <span style={{ display:"flex", alignItems:"center", gap:5 }}><Icon name="fileText" size={12} color={C.muted}/> {words.toLocaleString()} words</span>
                <span style={{ display:"flex", alignItems:"center", gap:5 }}><Icon name="video" size={12} color={C.muted}/> ~{mins} min video</span>
                <span style={{ display:"flex", alignItems:"center", gap:5 }}><Icon name="target" size={12} color={C.muted}/> {TONES.find(t=>t.id===selectedTone)?.label}</span>
                <span style={{ display:"flex", alignItems:"center", gap:5 }}><Icon name="users" size={12} color={C.muted}/> {AUDIENCES.find(a=>a.id===selectedAudience)?.label}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={copy} className="btn-green" style={{ background:C.green, color:C.greenLight, border:`1px solid ${C.greenMid}`, borderRadius:99, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", gap:8 }}>
                {copied ? <><Icon name="check" size={13} color={C.greenLight}/> Copied</> : <><Icon name="copy" size={13} color={C.greenLight}/> Copy</>}
              </button>
              <button onClick={download} className="btn-green" style={{ background:C.green, color:C.greenLight, border:`1px solid ${C.greenMid}`, borderRadius:99, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", gap:8 }}>
                <Icon name="download" size={13} color={C.greenLight}/> Download
              </button>
              <button onClick={reset} className="btn-red" style={{ background:C.red, color:"#fff", border:"none", borderRadius:99, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s", boxShadow:`0 2px 12px ${C.red}40`, display:"flex", alignItems:"center", gap:8 }}>
                <Icon name="plus" size={14} color="#fff"/> New
              </button>
            </div>
          </div>

          <div style={{ background:C.yellow, borderRadius:14, padding:"12px 18px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
            <Icon name="lightbulb" size={16} color={C.bgCard} style={{ marginTop:1, flexShrink:0 }} />
            <span style={{ fontSize:12, fontWeight:700, color:C.bgCard }}>100% original script — voiceover-ready, no headers or stage directions. Pure content.</span>
          </div>

          <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:20, padding:"32px 36px", lineHeight:1.95, fontSize:15, color:"#d0f0d8", whiteSpace:"pre-wrap", maxHeight:620, overflowY:"auto", fontFamily:"Georgia,serif", boxShadow:"0 8px 32px #00000060" }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom:28 }}>
      <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.5px", marginBottom:6, color:"#f0fdf4" }}>{title}</h2>
      <p style={{ fontSize:13, color:"#6b7f6e", lineHeight:1.6 }}>{sub}</p>
    </div>
  );
}
function Label({ children }) {
  return <div style={{ fontSize:12, fontWeight:700, color:"#6b7f6e", marginBottom:7, letterSpacing:"0.3px", textTransform:"uppercase" }}>{children}</div>;
}
function Input({ as, style, ...props }) {
  const base = { width:"100%", background:"#0f2212", border:"1px solid #1e3a22", borderRadius:12, padding:"12px 14px", color:"#f0fdf4", fontSize:14, outline:"none", fontFamily:"inherit", display:"block", marginBottom:18, ...style };
  return as==="textarea" ? <textarea style={base} {...props} /> : <input style={base} {...props} />;
}
function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background:"#0f2212", color:"#6b7f6e", border:"1px solid #1e3a22", borderRadius:99, padding:"4px 14px", fontSize:11, cursor:"pointer", marginBottom:18, fontWeight:600, display:"inline-flex", alignItems:"center", gap:5 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Change
    </button>
  );
}
function ErrBox({ children }) {
  return <div style={{ background:"#1a0808", border:"1px solid #ef444444", borderRadius:12, padding:"10px 14px", color:"#f87171", fontSize:12, marginBottom:14 }}>{children}</div>;
}
function Spin() {
  return <span style={{ width:14, height:14, border:"2px solid #ffffff22", borderTop:"2px solid #fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite", flexShrink:0 }} />;
}
function Row({ children }) {
  return <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>{children}</span>;
}
function Opt() { return <span style={{ color:"#3a5a3e", fontWeight:400, textTransform:"none", fontSize:11 }}> (optional)</span>; }
function Req() { return <span style={{ color:"#ef4444" }}> *</span>; }
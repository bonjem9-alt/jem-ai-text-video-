'use client';
import { useState } from 'react';

type Result = { id?: string; status?: string; output?: string[]; error?: string };
export default function Home() {
  const [mode,setMode] = useState<'text'|'photo'>('text');
  const [prompt,setPrompt] = useState('');
  const [file,setFile] = useState<File|null>(null);
  const [ratio,setRatio] = useState('720:1280');
  const [duration,setDuration] = useState(5);
  const [busy,setBusy] = useState(false);
  const [status,setStatus] = useState('');
  const [video,setVideo] = useState('');
  const [error,setError] = useState('');

  async function generate() {
    setError(''); setVideo(''); setStatus('Requesting video generation…'); setBusy(true);
    try {
      if (!prompt.trim()) throw new Error('እባክዎ የቪድዮውን መግለጫ ይጻፉ።');
      if (mode==='photo' && !file) throw new Error('እባክዎ ፎቶ ይምረጡ።');
      const form = new FormData();
      form.append('mode',mode); form.append('prompt',prompt); form.append('ratio',ratio); form.append('duration',String(duration));
      if (file) form.append('image',file);
      const start = await fetch('/api/generate',{method:'POST',body:form});
      const task: Result = await start.json();
      if (!start.ok || !task.id) throw new Error(task.error || 'Generation could not start.');
      setStatus('AI ቪድዮውን እየፈጠረ ነው…');
      for (let i=0;i<90;i++) {
        await new Promise(r=>setTimeout(r,4000));
        const res = await fetch(`/api/tasks/${task.id}`);
        const data: Result = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not check task status.');
        if (data.status==='SUCCEEDED' && data.output?.[0]) { setVideo(data.output[0]); setStatus('ቪድዮው ተፈጥሯል!'); return; }
        if (data.status==='FAILED') throw new Error(data.error || 'AI generation failed. Please try again.');
        setStatus(`AI ቪድዮውን እየሰራ ነው… (${i+1})`);
      }
      throw new Error('ጊዜው አልቋል። እባክዎ እንደገና ይሞክሩ።');
    } catch(e) { setError(e instanceof Error ? e.message : 'Unexpected error'); setStatus(''); }
    finally { setBusy(false); }
  }
  return <main className="shell">
    <header><div className="brandmark">✦</div><div><h1>Jem AI Video Studio</h1><p>CREATE • IMAGINE • MOVE</p></div><span className="tag">AI STUDIO</span></header>
    <section className="hero"><div className="eyebrow">YOUR IDEAS, IN MOTION</div><h2>በጽሑፍ ወይም በፎቶ<br/><em>ቪድዮ ፍጠር።</em></h2><p>Describe your scene or upload a photo. Let AI bring it to life.</p></section>
    <section className="panel">
      <div className="tabs"><button className={mode==='text'?'active':''} onClick={()=>setMode('text')}>✍ Text to Video</button><button className={mode==='photo'?'active':''} onClick={()=>setMode('photo')}>▧ Photo to Video</button></div>
      {mode==='photo' && <label className="upload"> <span className="uploadIcon">＋</span><b>{file ? file.name : 'ፎቶ ይምረጡ / Upload a photo'}</b><small>JPG, PNG or WebP · Max 5MB</small><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>}
      <label className="fieldLabel">የቪድዮ መግለጫ / PROMPT</label>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe what happens in your video… e.g. A man smiles naturally, turns toward the camera and speaks, cinematic lighting." rows={5}/>
      <div className="options"><label>FORMAT<select value={ratio} onChange={e=>setRatio(e.target.value)}><option value="720:1280">Portrait 9:16</option><option value="1280:720">Landscape 16:9</option><option value="960:960">Square 1:1</option></select></label><label>DURATION<select value={duration} onChange={e=>setDuration(Number(e.target.value))}><option value={5}>5 seconds</option><option value={10}>10 seconds</option></select></label></div>
      <button className="generate" disabled={busy} onClick={generate}>{busy?'Generating…':'✦  Generate Video'}</button>
      <p className="hint">Generation uses paid Runway API credits. Review the estimated cost before creating.</p>
      {status && <div className="status">{status}</div>}
      {error && <div className="error">{error}</div>}
    </section>
    {video && <section className="result"><h3>Your video is ready</h3><video src={video} controls playsInline/><a className="download" href={video} target="_blank" rel="noreferrer" download>Download video ↗</a></section>}
    <footer>Jem AI Video Studio · Use only photos you own or have permission to animate. AI-generated videos may depict events that never happened.</footer>
  </main>;
}

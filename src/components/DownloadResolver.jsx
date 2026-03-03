import { useState } from "react";
import { Download, CheckCircle2, Terminal, Info, Archive, ChevronDown } from "lucide-react";
import { SOFTWARE_REGISTRY, SOFTWARE_GROUPS, VERSION_MAP, resolveDownload } from "../utils/softwareData";

function Badge({text,color}) {
  return <span style={{background:color+"22",color,border:`1px solid ${color}55`,fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"999px",letterSpacing:"0.5px"}}>{text}</span>;
}

export default function DownloadResolver() {
  const [softwareId,setSoftwareId] = useState("paper");
  const [version,setVersion]       = useState("1.21.1");
  const [result,setResult]         = useState(null);
  const [loading,setLoading]       = useState(false);
  const [copied,setCopied]         = useState(false);
  const availableVersions = VERSION_MAP[softwareId] || [];
  const handleSoftwareChange = e => { const id=e.target.value; setSoftwareId(id); setVersion((VERSION_MAP[id]||[])[0]||""); setResult(null); };
  const handleResolve = () => { setLoading(true); setResult(null); setTimeout(()=>{ setResult(resolveDownload(softwareId,version)); setLoading(false); },600); };
  const handleCopy = () => { if(!result?.downloadUrl)return; navigator.clipboard.writeText(result.downloadUrl); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const ss = {width:"100%",background:"#18181b",border:"1px solid #3f3f46",borderRadius:"12px",padding:"10px 36px 10px 12px",fontSize:"13px",color:"white",outline:"none",cursor:"pointer",appearance:"none"};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
        <div style={{width:"28px",height:"28px",borderRadius:"8px",background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Download style={{width:"14px",height:"14px",color:"#10b981"}}/>
        </div>
        <span style={{fontSize:"14px",fontWeight:700,color:"white"}}>Download Resolver</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
        <div>
          <label style={{display:"block",fontSize:"11px",color:"#a1a1aa",marginBottom:"6px",fontWeight:500}}>Software</label>
          <div style={{position:"relative"}}>
            <select style={ss} value={softwareId} onChange={handleSoftwareChange}>
              {SOFTWARE_GROUPS.map(g=>(
                <optgroup key={g.id} label={`${g.emoji} ${g.label}`}>
                  {g.ids.map(id=><option key={id} value={id}>{SOFTWARE_REGISTRY[id]?.name}</option>)}
                </optgroup>
              ))}
            </select>
            <ChevronDown style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",width:"14px",height:"14px",color:"#71717a",pointerEvents:"none"}}/>
          </div>
        </div>
        <div>
          <label style={{display:"block",fontSize:"11px",color:"#a1a1aa",marginBottom:"6px",fontWeight:500}}>Version</label>
          <div style={{position:"relative"}}>
            <select style={ss} value={version} onChange={e=>{setVersion(e.target.value);setResult(null);}}>
              {availableVersions.map(v=><option key={v} value={v}>{v}</option>)}
            </select>
            <ChevronDown style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",width:"14px",height:"14px",color:"#71717a",pointerEvents:"none"}}/>
          </div>
        </div>
      </div>
      <button onClick={handleResolve} disabled={loading||!version} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:loading?"rgba(63,63,70,0.5)":"linear-gradient(135deg,#10b981,#059669)",color:"white",fontWeight:600,fontSize:"14px",padding:"11px",borderRadius:"12px",border:"none",cursor:loading?"not-allowed":"pointer",boxShadow:loading?"none":"0 4px 16px rgba(16,185,129,0.3)"}}>
        {loading ? <span style={{width:"16px",height:"16px",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",display:"inline-block",animation:"spin 0.6s linear infinite"}}/> : <><Download style={{width:"16px",height:"16px"}}/>Resolve Download URL</>}
      </button>
      {result&&!result.error&&(
        <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"16px",padding:"20px",display:"flex",flexDirection:"column",gap:"14px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}><CheckCircle2 style={{width:"16px",height:"16px",color:"#10b981"}}/><span style={{fontSize:"13px",fontWeight:600,color:"#6ee7b7"}}>URL Resolved</span></div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}><Badge text={result.badge} color={result.color}/><Badge text={result.fileType.toUpperCase()} color={result.isZipExtract?"#f97316":"#6366f1"}/>{result.isModpack&&<Badge text="MODPACK" color="#f97316"/>}</div>
          </div>
          <div style={{background:"#0a0a0f",border:"1px solid #27272a",borderRadius:"10px",padding:"12px 14px",display:"flex",alignItems:"flex-start",gap:"10px"}}>
            <Terminal style={{width:"14px",height:"14px",color:"#52525b",flexShrink:0,marginTop:"2px"}}/>
            <span style={{fontSize:"11px",color:"#a1a1aa",wordBreak:"break-all",flex:1,fontFamily:"monospace",lineHeight:"1.6"}}>{result.downloadUrl}</span>
            <button onClick={handleCopy} style={{background:copied?"rgba(16,185,129,0.2)":"rgba(63,63,70,0.5)",border:"none",color:copied?"#6ee7b7":"#a1a1aa",fontSize:"11px",fontWeight:600,padding:"4px 10px",borderRadius:"6px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>{copied?"Copied!":"Copy"}</button>
          </div>
          <div style={{display:"flex",gap:"8px",alignItems:"flex-start",background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:"10px",padding:"10px 12px"}}>
            <Info style={{width:"13px",height:"13px",color:"#fbbf24",flexShrink:0,marginTop:"1px"}}/>
            <span style={{fontSize:"11px",color:"#a1a1aa",lineHeight:"1.6"}}>{result.note}</span>
          </div>
          <div>
            <div style={{fontSize:"11px",color:"#71717a",fontWeight:600,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Install Pipeline</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
              {result.installSteps.map((step,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(39,39,42,0.6)",border:"1px solid #3f3f46",borderRadius:"999px",padding:"4px 10px",fontSize:"11px"}}>
                  <span style={{color:"#52525b",fontWeight:700,fontSize:"10px"}}>{i+1}</span>
                  <span style={{color:"#d4d4d8"}}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          {result.isZipExtract&&(
            <div style={{display:"flex",gap:"8px",alignItems:"flex-start",background:"rgba(249,115,22,0.08)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:"10px",padding:"12px"}}>
              <Archive style={{width:"14px",height:"14px",color:"#fb923c",flexShrink:0}}/>
              <div>
                <div style={{fontSize:"12px",fontWeight:600,color:"#fb923c",marginBottom:"4px"}}>{result.isModpack?"Modpack Extraction Required":"Archive Extraction Required"}</div>
                <div style={{fontSize:"11px",color:"#a1a1aa",lineHeight:"1.6"}}>{result.isModpack?"Backend will extract archive, parse manifest, then download each mod JAR individually.":"Backend will extract archive and set executable permissions on server binary."}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

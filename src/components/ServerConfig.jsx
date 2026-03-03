import { useState } from "react";
import { Settings, Clock, CheckCircle2, Zap, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";
import { DEFAULT_SERVER_CONFIG, RESTART_REQUIRED_KEYS } from "../utils/softwareData";

export default function ServerConfig() {
  const [saved, setSaved] = useState({...DEFAULT_SERVER_CONFIG});
  const [live, setLive]   = useState({...DEFAULT_SERVER_CONFIG});
  const [saving, setSaving]       = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const update = (key, val) => setLive(p => ({...p, [key]:val}));
  const changedKeys = RESTART_REQUIRED_KEYS.filter(k => live[k] !== saved[k]);
  const hasPending  = changedKeys.length > 0;
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaved({...live}); setSaving(false); setJustSaved(true); setTimeout(()=>setJustSaved(false),2000); }, 700);
  };
  const Toggle = ({fieldKey}) => (
    <button onClick={()=>update(fieldKey,!live[fieldKey])} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}>
      {live[fieldKey] ? <ToggleRight style={{width:"32px",height:"32px",color:"#10b981"}}/> : <ToggleLeft style={{width:"32px",height:"32px",color:"#52525b"}}/>}
    </button>
  );
  const Row = ({label,fieldKey,children}) => {
    const changed = live[fieldKey] !== saved[fieldKey];
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 0",borderBottom:"1px solid rgba(63,63,70,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"13px",color:changed?"#fbbf24":"#d4d4d8",fontWeight:changed?600:400}}>{label}</span>
          {changed && <span style={{fontSize:"10px",background:"rgba(251,191,36,0.15)",color:"#fbbf24",border:"1px solid rgba(251,191,36,0.3)",borderRadius:"999px",padding:"1px 7px",fontWeight:700}}>changed</span>}
        </div>
        {children}
      </div>
    );
  };
  const SelectField = ({fieldKey,options}) => (
    <div style={{position:"relative"}}>
      <select value={live[fieldKey]} onChange={e=>update(fieldKey,e.target.value)} style={{background:"#18181b",border:"1px solid #3f3f46",borderRadius:"8px",padding:"6px 28px 6px 10px",fontSize:"13px",color:"white",outline:"none",cursor:"pointer",appearance:"none"}}>
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown style={{position:"absolute",right:"7px",top:"50%",transform:"translateY(-50%)",width:"12px",height:"12px",color:"#71717a",pointerEvents:"none"}}/>
    </div>
  );
  const SliderField = ({fieldKey,min,max}) => (
    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
      <span style={{fontSize:"13px",color:"#a78bfa",fontWeight:700,minWidth:"28px",textAlign:"right"}}>{live[fieldKey]}</span>
      <input type="range" min={min} max={max} value={live[fieldKey]} onChange={e=>update(fieldKey,Number(e.target.value))} style={{width:"110px",accentColor:"#7c3aed",cursor:"pointer"}}/>
    </div>
  );
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{width:"28px",height:"28px",borderRadius:"8px",background:"rgba(167,139,250,0.15)",border:"1px solid rgba(167,139,250,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Settings style={{width:"14px",height:"14px",color:"#a78bfa"}}/>
          </div>
          <span style={{fontSize:"14px",fontWeight:700,color:"white"}}>Server Configuration</span>
        </div>
        {hasPending && (
          <div style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.35)",borderRadius:"999px",padding:"5px 14px"}}>
            <Clock style={{width:"13px",height:"13px",color:"#fbbf24"}}/>
            <span style={{fontSize:"12px",fontWeight:700,color:"#fbbf24"}}>Pending Restart — {changedKeys.length} change{changedKeys.length>1?"s":""}</span>
          </div>
        )}
      </div>
      <div>
        <Row label="Max Players" fieldKey="maxPlayers"><SliderField fieldKey="maxPlayers" min={1} max={200}/></Row>
        <Row label="Difficulty" fieldKey="difficulty"><SelectField fieldKey="difficulty" options={[{value:"peaceful",label:"Peaceful"},{value:"easy",label:"Easy"},{value:"normal",label:"Normal"},{value:"hard",label:"Hard"}]}/></Row>
        <Row label="Gamemode" fieldKey="gamemode"><SelectField fieldKey="gamemode" options={[{value:"survival",label:"Survival"},{value:"creative",label:"Creative"},{value:"adventure",label:"Adventure"},{value:"spectator",label:"Spectator"}]}/></Row>
        <Row label="Whitelist" fieldKey="whitelist"><Toggle fieldKey="whitelist"/></Row>
        <Row label="PvP" fieldKey="pvp"><Toggle fieldKey="pvp"/></Row>
        <Row label="Level Type" fieldKey="levelType"><SelectField fieldKey="levelType" options={[{value:"default",label:"Default"},{value:"flat",label:"Flat"},{value:"largeBiomes",label:"Large Biomes"},{value:"amplified",label:"Amplified"},{value:"buffet",label:"Buffet"}]}/></Row>
        <Row label="Spawn Protection" fieldKey="spawnProtection"><SliderField fieldKey="spawnProtection" min={0} max={64}/></Row>
        <Row label="View Distance" fieldKey="viewDistance"><SliderField fieldKey="viewDistance" min={2} max={32}/></Row>
      </div>
      {hasPending && (
        <div style={{background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:"12px",padding:"14px"}}>
          <div style={{fontSize:"11px",color:"#fbbf24",fontWeight:700,marginBottom:"10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Unsaved Changes</div>
          {changedKeys.map(k=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"12px",marginBottom:"6px"}}>
              <span style={{color:"#71717a"}}>{k}</span>
              <span style={{color:"#fbbf24",fontFamily:"monospace"}}>{String(saved[k])} → {String(live[k])}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:"10px"}}>
        <button onClick={()=>setLive({...saved})} disabled={!hasPending} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #3f3f46",background:"transparent",color:hasPending?"#a1a1aa":"#3f3f46",fontSize:"13px",fontWeight:600,cursor:hasPending?"pointer":"not-allowed"}}>Discard</button>
        <button onClick={handleSave} disabled={!hasPending||saving} style={{flex:2,padding:"10px",borderRadius:"10px",border:"none",background:hasPending?"linear-gradient(135deg,#7c3aed,#6d28d9)":"rgba(63,63,70,0.4)",color:"white",fontSize:"13px",fontWeight:600,cursor:hasPending?"pointer":"not-allowed",opacity:hasPending?1:0.5,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
          {saving ? <span style={{width:"14px",height:"14px",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",display:"inline-block",animation:"spin 0.6s linear infinite"}}/> : justSaved ? <><CheckCircle2 style={{width:"14px",height:"14px"}}/>Saved!</> : <><Zap style={{width:"14px",height:"14px"}}/>Apply & Queue Restart</>}
        </button>
      </div>
    </div>
  );
}

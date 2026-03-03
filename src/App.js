import { useState } from "react";
import { Server, Shield, Zap, HardDrive, ChevronRight, ChevronLeft, Eye, EyeOff, LogOut, User, Check, Cpu, Package, Globe, Layers, Box, ArrowRight, Sparkles, Lock, Mail, AlertCircle } from "lucide-react";

const SW = [
  {id:"java",label:"Java Edition",icon:Globe,c:"from-orange-500 to-amber-500",b:"border-orange-500/40",opts:[{id:"vanilla",name:"Vanilla",d:"Official Mojang server"},{id:"snapshot",name:"Snapshot",d:"Latest experimental builds"}]},
  {id:"plugins",label:"Plugins",icon:Package,c:"from-emerald-500 to-teal-500",b:"border-emerald-500/40",opts:[{id:"paper",name:"Paper",d:"High-performance fork"},{id:"spigot",name:"Spigot",d:"Optimised CraftBukkit"},{id:"purpur",name:"Purpur",d:"Feature-rich Paper fork"},{id:"glowstone",name:"Glowstone",d:"Open-source reimplementation"}]},
  {id:"mods",label:"Mods",icon:Layers,c:"from-violet-500 to-purple-500",b:"border-violet-500/40",opts:[{id:"fabric",name:"Fabric",d:"Lightweight mod loader"},{id:"quilt",name:"Quilt",d:"Community Fabric fork"},{id:"neoforge",name:"NeoForge",d:"Modern Forge successor"},{id:"forge",name:"Forge",d:"Classic mod platform"}]},
  {id:"bedrock",label:"Bedrock",icon:Box,c:"from-sky-500 to-cyan-500",b:"border-sky-500/40",opts:[{id:"bedrock",name:"Bedrock",d:"Official Bedrock server"},{id:"pocketmine",name:"PocketMine",d:"PHP-based Bedrock server"}]},
];
const VM = {vanilla:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.17.1","1.16.5"],snapshot:["24w33a","24w18a","23w51b","23w45a"],paper:["1.21.1","1.20.6","1.20.4","1.20.1","1.19.4","1.18.2"],spigot:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.17.1"],purpur:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2"],glowstone:["1.12.2","1.10.2"],fabric:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.16.5"],quilt:["1.21.1","1.20.4","1.20.1","1.19.4"],neoforge:["1.21.1","1.20.4","1.20.1"],forge:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.16.5","1.12.2"],bedrock:["1.21.2","1.21.0","1.20.80","1.20.40"],pocketmine:["5.7.0","5.6.1","5.5.3","4.23.6"]};

function Auth({onLogin}){
  const [mode,setMode]=useState("login");
  const [show,setShow]=useState(false);
  const [f,setF]=useState({email:"",password:"",username:""});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const h=e=>setF({...f,[e.target.name]:e.target.value});
  const go=()=>{
    setErr("");
    if(!f.email||!f.password){setErr("Please fill in all fields.");return;}
    if(mode==="signup"&&!f.username){setErr("Username is required.");return;}
    setLoading(true);
    setTimeout(()=>{setLoading(false);onLogin(f.username||f.email.split("@")[0]);},800);
  };
  return(
    <div style={{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"fixed",top:0,left:"25%",width:"400px",height:"400px",background:"radial-gradient(circle,rgba(139,92,246,0.12),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"relative",width:"100%",maxWidth:"420px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"64px",height:"64px",borderRadius:"16px",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",boxShadow:"0 8px 32px rgba(124,58,237,0.35)",marginBottom:"16px"}}>
            <Server style={{width:"32px",height:"32px",color:"white"}}/>
          </div>
          <h1 style={{fontSize:"24px",fontWeight:700,color:"white",margin:0,letterSpacing:"-0.5px"}}>CraftHost</h1>
          <p style={{color:"#71717a",fontSize:"14px",marginTop:"4px"}}>Premium Minecraft Hosting</p>
        </div>
        <div style={{background:"rgba(24,24,27,0.9)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"20px",padding:"32px",backdropFilter:"blur(20px)"}}>
          <div style={{display:"flex",background:"rgba(39,39,42,0.8)",borderRadius:"12px",padding:"4px",marginBottom:"24px"}}>
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"8px",fontSize:"14px",fontWeight:500,borderRadius:"10px",border:"none",cursor:"pointer",transition:"all 0.2s",background:mode===m?"#7c3aed":"transparent",color:mode===m?"white":"#a1a1aa",boxShadow:mode===m?"0 2px 8px rgba(124,58,237,0.4)":"none"}}>
                {m==="login"?"Sign In":"Sign Up"}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            {mode==="signup"&&(
              <div>
                <label style={{display:"block",fontSize:"12px",fontWeight:500,color:"#a1a1aa",marginBottom:"6px"}}>Username</label>
                <div style={{position:"relative"}}>
                  <User style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#71717a"}}/>
                  <input name="username" value={f.username} onChange={h} placeholder="Steve123" style={{width:"100%",background:"rgba(39,39,42,0.7)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"12px",padding:"10px 16px 10px 40px",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}}/>
                </div>
              </div>
            )}
            <div>
              <label style={{display:"block",fontSize:"12px",fontWeight:500,color:"#a1a1aa",marginBottom:"6px"}}>Email</label>
              <div style={{position:"relative"}}>
                <Mail style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#71717a"}}/>
                <input name="email" value={f.email} onChange={h} placeholder="you@example.com" type="email" style={{width:"100%",background:"rgba(39,39,42,0.7)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"12px",padding:"10px 16px 10px 40px",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
            <div>
              <label style={{display:"block",fontSize:"12px",fontWeight:500,color:"#a1a1aa",marginBottom:"6px"}}>Password</label>
              <div style={{position:"relative"}}>
                <Lock style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#71717a"}}/>
                <input name="password" value={f.password} onChange={h} placeholder="••••••••" type={show?"text":"password"} style={{width:"100%",background:"rgba(39,39,42,0.7)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"12px",padding:"10px 40px 10px 40px",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}}/>
                <button onClick={()=>setShow(!show)} style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#71717a",display:"flex",padding:0}}>
                  {show?<EyeOff style={{width:"16px",height:"16px"}}/>:<Eye style={{width:"16px",height:"16px"}}/>}
                </button>
              </div>
            </div>
            {err&&<div style={{display:"flex",alignItems:"center",gap:"8px",color:"#f87171",fontSize:"13px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"12px",padding:"10px 12px"}}>
              <AlertCircle style={{width:"14px",height:"14px",flexShrink:0}}/>{err}
            </div>}
            <button onClick={go} disabled={loading} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"white",fontWeight:600,fontSize:"14px",padding:"11px",borderRadius:"12px",border:"none",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,boxShadow:"0 4px 16px rgba(124,58,237,0.3)",transition:"all 0.2s",marginTop:"4px"}}>
              {loading?<span style={{width:"16px",height:"16px",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",display:"inline-block",animation:"spin 0.6s linear infinite"}}/>:<>{mode==="login"?"Sign In":"Create Account"}<ArrowRight style={{width:"16px",height:"16px"}}/></>}
            </button>
          </div>
        </div>
        <p style={{textAlign:"center",color:"#3f3f46",fontSize:"12px",marginTop:"20px"}}>Protected by CraftHost Security · 256-bit encryption</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} input::placeholder{color:#52525b} input:focus{border-color:rgba(124,58,237,0.6)!important;box-shadow:0 0 0 3px rgba(124,58,237,0.15)!important}`}</style>
    </div>
  );
}

function Steps({cur,steps}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 12px",borderRadius:"999px",fontSize:"12px",fontWeight:500,background:i<cur?"rgba(16,185,129,0.15)":i===cur?"rgba(124,58,237,0.2)":"rgba(39,39,42,0.6)",color:i<cur?"#34d399":i===cur?"#c4b5fd":"#71717a",border:`1px solid ${i<cur?"rgba(16,185,129,0.3)":i===cur?"rgba(124,58,237,0.4)":"rgba(63,63,70,0.4)"}`}}>
            <span style={{width:"16px",height:"16px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:700,background:i<cur?"#10b981":i===cur?"#7c3aed":"#52525b",color:"white"}}>
              {i<cur?<Check style={{width:"10px",height:"10px"}}/>:i+1}
            </span>
            <span>{s}</span>
          </div>
          {i<steps.length-1&&<div style={{width:"20px",height:"1px",background:i<cur?"rgba(16,185,129,0.4)":"rgba(63,63,70,0.4)"}}/>}
        </div>
      ))}
    </div>
  );
}

function S1({data,onChange}){
  const pct=((data.ram-1)/15)*100;
  const disks=[10,20,50,100,200,500];
  const tiers=[{l:"Starter",r:2,d:"1–5 players"},{l:"Standard",r:4,d:"5–15 players"},{l:"Advanced",r:8,d:"15–40 players"},{l:"Ultimate",r:16,d:"40+ players"}];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"32px"}}>
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <Cpu style={{width:"16px",height:"16px",color:"#a78bfa"}}/>
            <span style={{fontSize:"14px",fontWeight:600,color:"white"}}>RAM Allocation</span>
          </div>
          <div style={{background:"rgba(124,58,237,0.2)",border:"1px solid rgba(124,58,237,0.4)",borderRadius:"8px",padding:"4px 12px"}}>
            <span style={{color:"#c4b5fd",fontWeight:700,fontSize:"14px"}}>{data.ram} GB</span>
          </div>
        </div>
        <div style={{position:"relative",paddingBottom:"28px"}}>
          <div style={{height:"8px",background:"rgba(39,39,42,0.8)",borderRadius:"4px",position:"relative",overflow:"visible"}}>
            <div style={{position:"absolute",inset:"0 auto 0 0",width:`${pct}%`,background:"linear-gradient(90deg,#7c3aed,#a855f7)",borderRadius:"4px",transition:"width 0.1s"}}/>
            <input type="range" min="1" max="16" value={data.ram} onChange={e=>onChange({...data,ram:+e.target.value})} style={{position:"absolute",inset:0,width:"100%",opacity:0,cursor:"pointer",height:"8px",zIndex:10,margin:0}}/>
            <div style={{position:"absolute",top:"50%",transform:"translate(-50%,-50%)",left:`${pct}%`,width:"20px",height:"20px",background:"white",borderRadius:"50%",border:"3px solid #7c3aed",boxShadow:"0 2px 8px rgba(124,58,237,0.5)",pointerEvents:"none",transition:"left 0.1s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:"12px"}}>
            {[1,2,4,6,8,12,16].map(t=><span key={t} style={{fontSize:"10px",fontWeight:500,color:data.ram===t?"#a78bfa":"#52525b"}}>{t}GB</span>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginTop:"8px"}}>
          {tiers.map(t=>(
            <button key={t.r} onClick={()=>onChange({...data,ram:t.r})} style={{padding:"12px 8px",borderRadius:"12px",border:`1px solid ${data.ram===t.r?"rgba(124,58,237,0.5)":"rgba(63,63,70,0.4)"}`,background:data.ram===t.r?"rgba(124,58,237,0.15)":"rgba(39,39,42,0.5)",cursor:"pointer",textAlign:"left",transition:"all 0.15s",boxShadow:data.ram===t.r?"0 0 0 1px rgba(124,58,237,0.3)":"none"}}>
              <div style={{fontSize:"11px",fontWeight:600,color:data.ram===t.r?"#c4b5fd":"#d4d4d8"}}>{t.l}</div>
              <div style={{fontSize:"10px",color:"#71717a",marginTop:"2px"}}>{t.d}</div>
              <div style={{fontSize:"11px",fontWeight:700,color:data.ram===t.r?"#a78bfa":"#a1a1aa",marginTop:"4px"}}>{t.r} GB</div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
          <HardDrive style={{width:"16px",height:"16px",color:"#34d399"}}/>
          <span style={{fontSize:"14px",fontWeight:600,color:"white"}}>Disk Space (NVMe SSD)</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"8px"}}>
          {disks.map(d=>(
            <button key={d} onClick={()=>onChange({...data,disk:d})} style={{padding:"12px 4px",borderRadius:"12px",border:`1px solid ${data.disk===d?"rgba(16,185,129,0.5)":"rgba(63,63,70,0.4)"}`,background:data.disk===d?"rgba(16,185,129,0.15)":"rgba(39,39,42,0.5)",cursor:"pointer",textAlign:"center",transition:"all 0.15s",boxShadow:data.disk===d?"0 0 0 1px rgba(16,185,129,0.3)":"none"}}>
              <div style={{fontSize:"12px",fontWeight:700,color:data.disk===d?"#6ee7b7":"#d4d4d8"}}>{d>=1000?`${d/1000}TB`:`${d}GB`}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{background:"rgba(39,39,42,0.5)",border:"1px solid rgba(63,63,70,0.4)",borderRadius:"14px",padding:"16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
          <Sparkles style={{width:"14px",height:"14px",color:"#fbbf24"}}/>
          <span style={{fontSize:"12px",fontWeight:600,color:"#d4d4d8"}}>Configuration Preview</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          {[{L:"RAM",V:`${data.ram} GB DDR4`,I:Cpu},{L:"Storage",V:`${data.disk} GB NVMe`,I:HardDrive},{L:"Network",V:"1 Gbps Uplink",I:Zap},{L:"Protection",V:"DDoS Shield",I:Shield}].map(x=>(
            <div key={x.L} style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <x.I style={{width:"14px",height:"14px",color:"#52525b",flexShrink:0}}/>
              <div>
                <div style={{fontSize:"10px",color:"#71717a"}}>{x.L}</div>
                <div style={{fontSize:"12px",color:"#e4e4e7",fontWeight:500}}>{x.V}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S2({data,onChange}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"24px"}}>
      {SW.map(cat=>{
        const Icon=cat.icon;
        return(
          <div key={cat.id}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
              <div style={{width:"24px",height:"24px",borderRadius:"8px",background:`linear-gradient(135deg,${cat.c.includes("orange")?"#f97316,#f59e0b":cat.c.includes("emerald")?"#10b981,#14b8a6":cat.c.includes("violet")?"#8b5cf6,#a855f7":"#0ea5e9,#06b6d4"})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon style={{width:"14px",height:"14px",color:"white"}}/>
              </div>
              <span style={{fontSize:"14px",fontWeight:600,color:"white"}}>{cat.label}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"8px"}}>
              {cat.opts.map(opt=>{
                const sel=data.software===opt.id;
                const gc=cat.c.includes("orange")?"rgba(249,115,22,0.15)":cat.c.includes("emerald")?"rgba(16,185,129,0.15)":cat.c.includes("violet")?"rgba(139,92,246,0.15)":"rgba(14,165,233,0.15)";
                const bc=cat.c.includes("orange")?"rgba(249,115,22,0.4)":cat.c.includes("emerald")?"rgba(16,185,129,0.4)":cat.c.includes("violet")?"rgba(139,92,246,0.4)":"rgba(14,165,233,0.4)";
                const tc=cat.c.includes("orange")?"#fdba74":cat.c.includes("emerald")?"#6ee7b7":cat.c.includes("violet")?"#c4b5fd":"#7dd3fc";
                return(
                  <button key={opt.id} onClick={()=>onChange({...data,software:opt.id,version:""})} style={{position:"relative",padding:"12px",borderRadius:"12px",border:`1px solid ${sel?bc:"rgba(63,63,70,0.4)"}`,background:sel?gc:"rgba(39,39,42,0.5)",cursor:"pointer",textAlign:"left",transition:"all 0.15s",boxShadow:sel?`0 0 0 1px ${bc},0 4px 12px ${gc}`:"none"}}>
                    {sel&&<div style={{position:"absolute",top:"8px",right:"8px",width:"16px",height:"16px",borderRadius:"50%",background:bc,display:"flex",alignItems:"center",justifyContent:"center"}}><Check style={{width:"10px",height:"10px",color:tc}}/></div>}
                    <div style={{fontSize:"12px",fontWeight:700,color:sel?tc:"#d4d4d8",paddingRight:"20px"}}>{opt.name}</div>
                    <div style={{fontSize:"11px",color:"#71717a",marginTop:"3px",lineHeight:"1.4"}}>{opt.d}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function S3({data,onChange}){
  const versions=data.software?(VM[data.software]||[]):[];
  const soft=SW.flatMap(c=>c.opts).find(o=>o.id===data.software);
  if(!data.software) return(
    <div style={{textAlign:"center",padding:"48px 0"}}>
      <Layers style={{width:"40px",height:"40px",color:"#3f3f46",margin:"0 auto 12px"}}/>
      <p style={{color:"#71717a",fontSize:"14px"}}>Go back and select a server software first.</p>
    </div>
  );
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"24px"}}>
      <div style={{background:"rgba(39,39,42,0.5)",border:"1px solid rgba(63,63,70,0.4)",borderRadius:"14px",padding:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
        <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(124,58,237,0.2)",border:"1px solid rgba(124,58,237,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Package style={{width:"16px",height:"16px",color:"#a78bfa"}}/>
        </div>
        <div>
          <div style={{fontSize:"11px",color:"#71717a"}}>Selected Software</div>
          <div style={{fontSize:"14px",fontWeight:600,color:"white"}}>{soft?.name}</div>
        </div>
      </div>
      <div>
        <label style={{display:"block",fontSize:"12px",fontWeight:500,color:"#a1a1aa",marginBottom:"12px"}}>Choose a Version</label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:"8px"}}>
          {versions.map(v=>(
            <button key={v} onClick={()=>onChange({...data,version:v})} style={{padding:"12px 14px",borderRadius:"12px",border:`1px solid ${data.version===v?"rgba(124,58,237,0.5)":"rgba(63,63,70,0.4)"}`,background:data.version===v?"rgba(124,58,237,0.15)":"rgba(39,39,42,0.5)",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.15s",boxShadow:data.version===v?"0 0 0 1px rgba(124,58,237,0.3)":"none"}}>
              <span style={{fontSize:"12px",fontWeight:700,fontFamily:"monospace",color:data.version===v?"#c4b5fd":"#d4d4d8"}}>{v}</span>
              {data.version===v&&<Check style={{width:"12px",height:"12px",color:"#a78bfa"}}/>}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={{display:"block",fontSize:"12px",fontWeight:500,color:"#a1a1aa",marginBottom:"8px"}}>Server Name</label>
        <input value={data.name||""} onChange={e=>onChange({...data,name:e.target.value})} placeholder="My Awesome Server" style={{width:"100%",background:"rgba(39,39,42,0.7)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"12px",padding:"10px 16px",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}}/>
      </div>
      {data.version&&(
        <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.1),rgba(168,85,247,0.05))",border:"1px solid rgba(124,58,237,0.25)",borderRadius:"14px",padding:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
            <Sparkles style={{width:"14px",height:"14px",color:"#a78bfa"}}/>
            <span style={{fontSize:"12px",fontWeight:600,color:"#c4b5fd"}}>Ready to Deploy</span>
          </div>
          {[["Server Name",data.name||"Unnamed Server"],["Software",soft?.name],["Version",data.version],["RAM",`${data.ram} GB`],["Disk",`${data.disk} GB SSD`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"12px",marginBottom:"8px"}}>
              <span style={{color:"#71717a"}}>{k}</span>
              <span style={{color:"#e4e4e7",fontWeight:500}}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Dashboard({username,onLogout}){
  const STEPS=["Resources","Software","Version"];
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  const [cfg,setCfg]=useState({ram:4,disk:20,software:"",version:"",name:""});
  const ok=()=>{
    if(step===0)return cfg.ram>0&&cfg.disk>0;
    if(step===1)return!!cfg.software;
    if(step===2)return!!cfg.version;
    return false;
  };
  if(done){
    const soft=SW.flatMap(c=>c.opts).find(o=>o.id===cfg.software);
    return(
      <div style={{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
        <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
        <div style={{textAlign:"center",maxWidth:"440px",width:"100%",position:"relative"}}>
          <div style={{width:"80px",height:"80px",background:"linear-gradient(135deg,#10b981,#14b8a6)",borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:"0 12px 40px rgba(16,185,129,0.35)"}}>
            <Check style={{width:"40px",height:"40px",color:"white"}}/>
          </div>
          <h2 style={{fontSize:"24px",fontWeight:700,color:"white",margin:"0 0 8px"}}>Server Deployed!</h2>
          <p style={{color:"#71717a",fontSize:"14px",marginBottom:"24px",lineHeight:"1.6"}}>
            <span style={{color:"#a78bfa",fontWeight:600}}>"{cfg.name||"Unnamed Server"}"</span> is spinning up and will be online in ~60 seconds.
          </p>
          <div style={{background:"rgba(24,24,27,0.9)",border:"1px solid rgba(63,63,70,0.6)",borderRadius:"14px",padding:"16px",textAlign:"left",marginBottom:"24px"}}>
            {[["Software",soft?.name],["Version",cfg.version],["RAM",`${cfg.ram} GB DDR4`],["Storage",`${cfg.disk} GB NVMe SSD`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"13px",marginBottom:"10px",paddingBottom:"10px",borderBottom:"1px solid rgba(63,63,70,0.3)"}}>
                <span style={{color:"#71717a"}}>{k}</span><span style={{color:"#e4e4e7",fontWeight:500}}>{v}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"13px"}}>
              <span style={{color:"#71717a"}}>Status</span>
              <span style={{color:"#34d399",fontWeight:600,display:"flex",alignItems:"center",gap:"4px"}}><span style={{width:"6px",height:"6px",background:"#34d399",borderRadius:"50%",display:"inline-block",animation:"pulse 1.5s infinite"}}/>Starting up...</span>
            </div>
          </div>
          <button onClick={()=>{setDone(false);setStep(0);setCfg({ram:4,disk:20,software:"",version:"",name:""});}} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"white",fontSize:"14px",fontWeight:600,padding:"11px 24px",borderRadius:"12px",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(124,58,237,0.3)"}}>
            Create Another Server
          </button>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </div>
    );
  }
  return(
    <div style={{minHeight:"100vh",background:"#0a0a0f"}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <header style={{position:"sticky",top:0,zIndex:10,borderBottom:"1px solid rgba(63,63,70,0.5)",background:"rgba(9,9,11,0.85)",backdropFilter:"blur(20px)"}}>
        <div style={{maxWidth:"860px",margin:"0 auto",padding:"0 16px",height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Server style={{width:"15px",height:"15px",color:"white"}}/>
            </div>
            <span style={{fontWeight:700,color:"white",fontSize:"15px",letterSpacing:"-0.3px"}}>CraftHost</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",background:"rgba(39,39,42,0.7)",border:"1px solid rgba(63,63,70,0.5)",borderRadius:"10px",padding:"6px 12px"}}>
              <div style={{width:"20px",height:"20px",background:"rgba(124,58,237,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <User style={{width:"11px",height:"11px",color:"#a78bfa"}}/>
              </div>
              <span style={{fontSize:"13px",color:"#d4d4d8",fontWeight:500}}>{username}</span>
            </div>
            <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",color:"#71717a",fontSize:"13px",padding:"6px 8px",borderRadius:"8px"}}>
              <LogOut style={{width:"14px",height:"14px"}}/>Logout
            </button>
          </div>
        </div>
      </header>
      <main style={{maxWidth:"860px",margin:"0 auto",padding:"32px 16px",position:"relative"}}>
        <div style={{marginBottom:"28px"}}>
          <h1 style={{fontSize:"20px",fontWeight:700,color:"white",margin:"0 0 4px"}}>Server Creator</h1>
          <p style={{color:"#71717a",fontSize:"14px",margin:0}}>Configure and deploy your Minecraft server in minutes.</p>
        </div>
        <div style={{background:"rgba(24,24,27,0.7)",border:"1px solid rgba(63,63,70,0.5)",borderRadius:"20px",overflow:"hidden",backdropFilter:"blur(20px)"}}>
          <div style={{borderBottom:"1px solid rgba(63,63,70,0.5)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",background:"rgba(9,9,11,0.4)"}}>
            <Steps cur={step} steps={STEPS}/>
            <span style={{fontSize:"12px",color:"#52525b"}}>Step {step+1} of {STEPS.length}</span>
          </div>
          <div style={{padding:"24px"}}>
            {step===0&&<S1 data={cfg} onChange={setCfg}/>}
            {step===1&&<S2 data={cfg} onChange={setCfg}/>}
            {step===2&&<S3 data={cfg} onChange={setCfg}/>}
          </div>
          <div style={{borderTop:"1px solid rgba(63,63,70,0.5)",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(9,9,11,0.4)"}}>
            <button onClick={()=>setStep(s=>s-1)} disabled={step===0} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:step===0?"not-allowed":"pointer",color:step===0?"#3f3f46":"#a1a1aa",fontSize:"14px",padding:"8px 12px",borderRadius:"10px",opacity:step===0?0.5:1,transition:"color 0.15s"}}>
              <ChevronLeft style={{width:"16px",height:"16px"}}/>Back
            </button>
            {step<STEPS.length-1?(
              <button onClick={()=>setStep(s=>s+1)} disabled={!ok()} style={{display:"flex",alignItems:"center",gap:"6px",background:ok()?"linear-gradient(135deg,#7c3aed,#6d28d9)":"rgba(63,63,70,0.5)",color:"white",fontSize:"14px",fontWeight:600,padding:"9px 20px",borderRadius:"12px",border:"none",cursor:ok()?"pointer":"not-allowed",boxShadow:ok()?"0 4px 16px rgba(124,58,237,0.3)":"none",transition:"all 0.15s",opacity:ok()?1:0.5}}>
                Continue<ChevronRight style={{width:"16px",height:"16px"}}/>
              </button>
            ):(
              <button onClick={()=>setDone(true)} disabled={!ok()} style={{display:"flex",alignItems:"center",gap:"6px",background:ok()?"linear-gradient(135deg,#059669,#0d9488)":"rgba(63,63,70,0.5)",color:"white",fontSize:"14px",fontWeight:600,padding:"9px 20px",borderRadius:"12px",border:"none",cursor:ok()?"pointer":"not-allowed",boxShadow:ok()?"0 4px 16px rgba(5,150,105,0.3)":"none",transition:"all 0.15s",opacity:ok()?1:0.5}}>
                <Zap style={{width:"16px",height:"16px"}}/>Deploy Server
              </button>
            )}
          </div>
        </div>
      </main>
      <style>{`input::placeholder{color:#52525b!important} input:focus{border-color:rgba(124,58,237,0.6)!important;outline:none!important;box-shadow:0 0 0 3px rgba(124,58,237,0.15)!important}`}</style>
    </div>
  );
}

export default function App(){
  const [user,setUser]=useState(null);
  if(!user)return<Auth onLogin={setUser}/>;
  return<Dashboard username={user} onLogout={()=>setUser(null)}/>;
}
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Square, Zap, Send, Clock, Cpu, Users, Terminal } from "lucide-react";

const BOOT_SEQUENCE = [
  { type: "info",   text: "Starting minecraft server version 1.21.1" },
  { type: "info",   text: "Loading properties" },
  { type: "info",   text: "Default game type: SURVIVAL" },
  { type: "info",   text: "Generating keypair" },
  { type: "info",   text: "Starting Minecraft server on *:25565" },
  { type: "info",   text: "Using epoll channel type" },
  { type: "info",   text: "Preparing level \"world\"" },
  { type: "info",   text: "Preparing start region for dimension minecraft:overworld" },
  { type: "info",   text: "Preparing spawn area: 0%" },
  { type: "info",   text: "Preparing spawn area: 24%" },
  { type: "info",   text: "Preparing spawn area: 57%" },
  { type: "info",   text: "Preparing spawn area: 83%" },
  { type: "info",   text: "Preparing spawn area: 100%" },
  { type: "info",   text: "Time elapsed: 3842 ms" },
  { type: "info",   text: "Running delayed init tasks" },
  { type: "info",   text: "Done (4.201s)! For help, type \"help\"" },
  { type: "system", text: "✓ Server is now online." },
];

const IDLE_LOGS = [
  { type: "info",  text: "UUID of player Steve is a8f3c2d1-4e5b-6789-abcd-ef0123456789" },
  { type: "info",  text: "Steve joined the game" },
  { type: "info",  text: "Steve lost connection: Timed out" },
  { type: "warn",  text: "Can't keep up! Is the server overloaded? Running 2034ms behind." },
  { type: "info",  text: "Alex joined the game" },
  { type: "info",  text: "Alex: Hello everyone!" },
  { type: "info",  text: "Saved the game" },
  { type: "warn",  text: "Skipping TileEntity with id minecraft:furnace" },
  { type: "info",  text: "Alex left the game" },
  { type: "error", text: "Failed to load chunk [0, -1] in world 'world'" },
  { type: "info",  text: "Autosave started" },
  { type: "info",  text: "Autosave finished" },
  { type: "info",  text: "Notch joined the game" },
  { type: "warn",  text: "Moving too fast! Notch" },
  { type: "info",  text: "Notch left the game" },
];

const COMMAND_RESPONSES = {
  "/help":     [{ type: "info", text: "--- Showing help page 1 of 8 (/help <page>) ---" }, { type: "info", text: "/ban <player>, /ban-ip, /clear, /difficulty, /effect, /enchant" }],
  "/list":     [{ type: "info", text: "There are 0 of a max of 20 players online:" }],
  "/stop":     [{ type: "warn", text: "Stopping the server..." }, { type: "info", text: "Saving worlds" }],
  "/save-all": [{ type: "info", text: "Saving..." }, { type: "info", text: "Saved the game" }],
  "/version":  [{ type: "info", text: "This server is running Paper version git-Paper-196 (MC: 1.21.1)" }],
  "/tps":      [{ type: "info", text: "TPS from last 1m, 5m, 15m: 20.0, 20.0, 19.97" }],
  "/gc":       [{ type: "info", text: "Current Memory Usage: 512 MB / 2048 MB (25%)" }],
};

const LOG_COLORS = {
  info:   "#a1a1aa",
  warn:   "#fbbf24",
  error:  "#f87171",
  cmd:    "#818cf8",
  system: "#34d399",
};

const STATUS_CONFIG = {
  offline:  { label: "Offline",  color: "#f87171", bg: "rgba(248,113,113,0.12)", dot: "#f87171" },
  starting: { label: "Starting", color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  dot: "#fbbf24" },
  online:   { label: "Online",   color: "#34d399", bg: "rgba(52,211,153,0.12)",  dot: "#34d399" },
  stopping: { label: "Stopping", color: "#fb923c", bg: "rgba(251,146,60,0.12)",  dot: "#fb923c" },
};

const ts = () => {
  const d = new Date();
  return "[" + String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0") + ":" + String(d.getSeconds()).padStart(2,"0") + "]";
};

export function Modal({ open, title, message, confirmLabel, confirmColor, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(4px)" }}>
      <div style={{ background:"#18181b",border:"1px solid #3f3f46",borderRadius:"16px",padding:"24px",maxWidth:"400px",width:"100%" }}>
        <h3 style={{ fontSize:"15px",fontWeight:700,color:"white",marginBottom:"10px" }}>{title}</h3>
        <p style={{ fontSize:"13px",color:"#a1a1aa",lineHeight:"1.6",marginBottom:"20px" }}>{message}</p>
        <div style={{ display:"flex",gap:"10px" }}>
          <button onClick={onCancel} style={{ flex:1,padding:"9px",borderRadius:"10px",border:"1px solid #3f3f46",background:"transparent",color:"#a1a1aa",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex:1,padding:"9px",borderRadius:"10px",border:"none",background:confirmColor||"#ef4444",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>{confirmLabel||"Confirm"}</button>
        </div>
      </div>
    </div>
  );
}

export default function ServerConsole() {
  const [status, setStatus]         = useState("offline");
  const [logs, setLogs]             = useState([{ type:"system", text:"CraftHost console ready. Server is offline.", ts:ts() }]);
  const [input, setInput]           = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [stats, setStats]           = useState({ cpu:0, ram:0, players:0, tps:0 });
  const [uptime, setUptime]         = useState(0);
  const [modal, setModal]           = useState(null);
  const logRef   = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const uptRef   = useRef(null);

  const addLog = useCallback((entries) => {
    setLogs(prev => [...prev, ...entries.map(e => ({ ...e, ts: ts() }))]);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    if (status === "online") {
      timerRef.current = setInterval(() => {
        if (Math.random() < 0.3) addLog([IDLE_LOGS[Math.floor(Math.random() * IDLE_LOGS.length)]]);
        setStats({ cpu: Math.floor(Math.random()*40+5), ram: Math.floor(Math.random()*800+400), players: Math.floor(Math.random()*3), tps: +(19.5+Math.random()*0.5).toFixed(2) });
      }, 3000);
      uptRef.current = setInterval(() => setUptime(p => p+1), 1000);
    } else {
      clearInterval(timerRef.current);
      clearInterval(uptRef.current);
      if (status === "offline") setUptime(0);
    }
    return () => { clearInterval(timerRef.current); clearInterval(uptRef.current); };
  }, [status, addLog]);

  const fmt = (s) => String(Math.floor(s/3600)).padStart(2,"0")+":"+String(Math.floor((s%3600)/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");

  const handleStart = () => {
    if (status !== "offline") return;
    setStatus("starting");
    addLog([{ type:"system", text:"▶ Server starting..." }]);
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        addLog([BOOT_SEQUENCE[i++]]);
        if (BOOT_SEQUENCE[i-1]?.text?.includes("✓")) { setStatus("online"); clearInterval(iv); }
      } else { clearInterval(iv); setStatus("online"); }
    }, 200);
  };

  const handleStop = () => {
    if (status !== "online") return;
    setModal({ title:"Stop Server", message:"This will gracefully stop the server and save all world data. Players will be disconnected.", confirmLabel:"Stop Server", confirmColor:"#f59e0b",
      onConfirm: () => {
        setModal(null); setStatus("stopping");
        addLog([{ type:"system", text:"⏹ Stopping gracefully..." }, { type:"warn", text:"Stopping the server..." }]);
        setTimeout(() => addLog([{ type:"info", text:"Saving worlds" }]), 600);
        setTimeout(() => addLog([{ type:"info", text:"ThreadedAnvilChunkStorage: All dimensions are saved" }]), 1200);
        setTimeout(() => { setStatus("offline"); addLog([{ type:"system", text:"✓ Server stopped." }]); }, 2200);
      },
    });
  };

  const handleKill = () => {
    if (status === "offline") return;
    setModal({ title:"Force Kill Server", message:"⚠ This will immediately terminate the server process. World data may be lost or corrupted.", confirmLabel:"Force Kill", confirmColor:"#ef4444",
      onConfirm: () => { setModal(null); setStatus("offline"); addLog([{ type:"error", text:"SIGKILL received — server process terminated." }, { type:"system", text:"✗ Server killed." }]); },
    });
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    if (status !== "online") { addLog([{ type:"error", text:"Server is not running." }]); setInput(""); return; }
    addLog([{ type:"cmd", text:"> " + cmd }]);
    setCmdHistory(prev => [cmd, ...prev.slice(0,49)]);
    setHistIdx(-1);
    const res = COMMAND_RESPONSES[cmd.toLowerCase()] || [{ type:"warn", text:"Unknown command \"" + cmd + "\". Type \"/help\" for help." }];
    setTimeout(() => addLog(res), 120);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); const n=Math.min(histIdx+1,cmdHistory.length-1); setHistIdx(n); setInput(cmdHistory[n]||""); }
    if (e.key === "ArrowDown") { e.preventDefault(); const n=Math.max(histIdx-1,-1); setHistIdx(n); setInput(n===-1?"":cmdHistory[n]); }
  };

  const st = STATUS_CONFIG[status];

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px",background:"rgba(24,24,27,0.8)",border:"1px solid #27272a",borderRadius:"14px",padding:"12px 16px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"7px",background:st.bg,border:"1px solid "+st.color+"44",borderRadius:"999px",padding:"5px 12px" }}>
            <span style={{ width:"7px",height:"7px",borderRadius:"50%",background:st.dot,display:"inline-block",boxShadow:"0 0 6px "+st.dot,animation:status==="online"?"pulse 2s infinite":"none" }}/>
            <span style={{ fontSize:"12px",fontWeight:700,color:st.color }}>{st.label}</span>
          </div>
          {status === "online" && (<>
            <div style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"#71717a" }}><Clock style={{ width:"12px",height:"12px" }}/><span style={{ color:"#d4d4d8",fontFamily:"monospace" }}>{fmt(uptime)}</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"#71717a" }}><Cpu style={{ width:"12px",height:"12px" }}/><span style={{ color:stats.cpu>60?"#fbbf24":"#d4d4d8" }}>{stats.cpu}%</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"#71717a" }}><span style={{ fontSize:"10px" }}>RAM</span><span style={{ color:"#d4d4d8",fontFamily:"monospace" }}>{stats.ram}MB</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"#71717a" }}><Users style={{ width:"12px",height:"12px" }}/><span style={{ color:"#d4d4d8" }}>{stats.players}/20</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"#71717a" }}><span style={{ fontSize:"10px" }}>TPS</span><span style={{ color:stats.tps<19?"#fbbf24":"#34d399",fontFamily:"monospace" }}>{stats.tps}</span></div>
          </>)}
        </div>
        <div style={{ display:"flex",gap:"8px" }}>
          {[{label:"Start",icon:Play,onClick:handleStart,active:status==="offline",c:"#34d399"},{label:"Stop",icon:Square,onClick:handleStop,active:status==="online",c:"#fbbf24"},{label:"Kill",icon:Zap,onClick:handleKill,active:status!=="offline",c:"#f87171"}].map(btn=>(
            <button key={btn.label} onClick={btn.onClick} disabled={!btn.active} style={{ display:"flex",alignItems:"center",gap:"6px",padding:"7px 14px",borderRadius:"10px",border:"1px solid "+(btn.active?btn.c+"44":"rgba(63,63,70,0.4)"),background:btn.active?btn.c+"18":"rgba(39,39,42,0.4)",color:btn.active?btn.c:"#52525b",fontSize:"12px",fontWeight:600,cursor:btn.active?"pointer":"not-allowed",transition:"all 0.15s" }}>
              <btn.icon style={{ width:"13px",height:"13px" }}/>{btn.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background:"#0a0a0f",border:"1px solid #27272a",borderRadius:"14px",overflow:"hidden" }}>
        <div style={{ background:"#18181b",borderBottom:"1px solid #27272a",padding:"8px 14px",display:"flex",alignItems:"center",gap:"8px" }}>
          <div style={{ display:"flex",gap:"5px" }}>
            <span style={{ width:"10px",height:"10px",borderRadius:"50%",background:"#ef4444" }}/>
            <span style={{ width:"10px",height:"10px",borderRadius:"50%",background:"#fbbf24" }}/>
            <span style={{ width:"10px",height:"10px",borderRadius:"50%",background:"#22c55e" }}/>
          </div>
          <span style={{ fontSize:"11px",color:"#52525b",marginLeft:"8px",fontFamily:"monospace" }}>server-console — crafthost</span>
          <Terminal style={{ width:"12px",height:"12px",color:"#52525b",marginLeft:"auto" }}/>
        </div>
        <div ref={logRef} style={{ height:"340px",overflowY:"auto",padding:"12px 14px",fontFamily:"monospace",fontSize:"12px",lineHeight:"1.7",scrollBehavior:"smooth" }}>
          {logs.map((log,i) => (
            <div key={i} style={{ display:"flex",gap:"10px",marginBottom:"1px" }}>
              <span style={{ color:"#3f3f46",flexShrink:0,userSelect:"none",fontSize:"11px" }}>{log.ts}</span>
              <span style={{ color:LOG_COLORS[log.type]||"#a1a1aa",wordBreak:"break-all" }}>{log.text}</span>
            </div>
          ))}
          {status==="starting" && <div style={{ display:"flex",alignItems:"center",gap:"8px",color:"#fbbf24",marginTop:"4px" }}><span style={{ width:"10px",height:"10px",border:"2px solid rgba(251,191,36,0.3)",borderTop:"2px solid #fbbf24",borderRadius:"50%",display:"inline-block",animation:"spin 0.6s linear infinite" }}/><span style={{ fontSize:"11px" }}>Loading...</span></div>}
        </div>
        <div style={{ borderTop:"1px solid #1f1f23",padding:"10px 14px",display:"flex",gap:"8px",background:"#0f0f12" }}>
          <span style={{ color:"#34d399",fontFamily:"monospace",fontSize:"13px",alignSelf:"center",userSelect:"none" }}>$</span>
          <form onSubmit={handleCommand} style={{ flex:1,display:"flex",gap:"8px" }}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={status==="online"?"Type a command... (↑↓ for history)":"Server offline"}
              disabled={status!=="online"}
              style={{ flex:1,background:"transparent",border:"none",outline:"none",color:status==="online"?"#e4e4e7":"#52525b",fontFamily:"monospace",fontSize:"13px",caretColor:"#34d399" }}/>
            <button type="submit" disabled={status!=="online"||!input.trim()} style={{ background:"none",border:"none",cursor:status==="online"&&input.trim()?"pointer":"not-allowed",color:status==="online"&&input.trim()?"#34d399":"#3f3f46",padding:"2px",display:"flex",alignItems:"center" }}>
              <Send style={{ width:"15px",height:"15px" }}/>
            </button>
          </form>
        </div>
      </div>
      <Modal {...modal} open={!!modal} onCancel={() => setModal(null)} />
    </div>
  );
}

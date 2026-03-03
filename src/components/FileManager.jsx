import { useState } from "react";
import { FolderOpen, Folder, FileText, Edit3, Trash2, ChevronRight, Search, X } from "lucide-react";
import { Modal } from "./ServerConsole";

const INITIAL_FILES = [
  { id:1,  name:"server.properties",   type:"file",   size:"4.2 KB",  modified:"2 mins ago",  icon:"properties" },
  { id:2,  name:"world",               type:"folder", size:"842 MB",  modified:"Just now",     icon:"folder" },
  { id:3,  name:"plugins",             type:"folder", size:"128 MB",  modified:"1 hour ago",   icon:"folder" },
  { id:4,  name:"logs",                type:"folder", size:"12 MB",   modified:"Just now",     icon:"folder" },
  { id:5,  name:"eula.txt",            type:"file",   size:"0.2 KB",  modified:"3 days ago",   icon:"text" },
  { id:6,  name:"paper.yml",           type:"file",   size:"22 KB",   modified:"1 day ago",    icon:"yml" },
  { id:7,  name:"spigot.yml",          type:"file",   size:"18 KB",   modified:"1 day ago",    icon:"yml" },
  { id:8,  name:"bukkit.yml",          type:"file",   size:"6 KB",    modified:"1 day ago",    icon:"yml" },
  { id:9,  name:"ops.json",            type:"file",   size:"0.8 KB",  modified:"5 mins ago",   icon:"json" },
  { id:10, name:"whitelist.json",      type:"file",   size:"0.3 KB",  modified:"2 days ago",   icon:"json" },
  { id:11, name:"banned-players.json", type:"file",   size:"0.1 KB",  modified:"1 week ago",   icon:"json" },
  { id:12, name:"crash-reports",       type:"folder", size:"2 MB",    modified:"3 days ago",   icon:"folder" },
];

const FILE_DEFAULTS = {
  "server.properties": "#Minecraft server properties\nserver-port=25565\nmax-players=20\ndifficulty=normal\ngamemode=survival\nwhitelist=false\nlevel-name=world\nlevel-type=default\nonline-mode=true\npvp=true\nspawn-protection=16\nview-distance=10",
  "eula.txt": "#By changing the setting below to TRUE you are indicating your agreement to our EULA.\neula=true",
  "ops.json": '[\n  {\n    "uuid": "a8f3c2d1-4e5b-6789-abcd-ef0123456789",\n    "name": "Steve",\n    "level": 4\n  }\n]',
  "whitelist.json": '[\n  {\n    "uuid": "a8f3c2d1-4e5b-6789-abcd-ef0123456789",\n    "name": "Steve"\n  }\n]',
};

const fileColor = (icon) => ({ properties:"#34d399", folder:"#fbbf24", text:"#a1a1aa", yml:"#818cf8", json:"#fb923c" }[icon] || "#a1a1aa");

const ExtBadge = ({ name }) => {
  const ext = name.split(".").pop().toUpperCase();
  const colors = { PROPERTIES:"#34d399", TXT:"#a1a1aa", YML:"#818cf8", JSON:"#fb923c" };
  const c = colors[ext] || "#71717a";
  return <span style={{ fontSize:"9px",fontWeight:700,color:c,background:c+"18",border:"1px solid "+c+"33",padding:"1px 5px",borderRadius:"4px" }}>{ext}</span>;
};

export default function FileManager() {
  const [files, setFiles]         = useState(INITIAL_FILES);
  const [modal, setModal]         = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);

  const showToast = (msg, color="#34d399") => { setToast({ msg, color }); setTimeout(() => setToast(null), 2500); };

  const handleDelete = (file) => {
    setModal({
      title: "Delete \"" + file.name + "\"",
      message: file.type==="folder" ? "This will permanently delete the folder \""+file.name+"\" and ALL its contents. This cannot be undone." : "This will permanently delete \""+file.name+"\". This action cannot be undone.",
      confirmLabel: "Delete Permanently", confirmColor: "#ef4444",
      onConfirm: () => { setFiles(prev => prev.filter(f => f.id !== file.id)); setModal(null); showToast("\""+file.name+"\" deleted.", "#f87171"); },
    });
  };

  const handleEdit = (file) => {
    if (file.type === "folder") { showToast("Opening \""+file.name+"\"...", "#fbbf24"); return; }
    setEditModal(file);
  };

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const folders  = filtered.filter(f => f.type === "folder");
  const fileList = filtered.filter(f => f.type === "file");

  const Row = ({ file }) => (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 80px 100px 90px",gap:"8px",alignItems:"center",padding:"10px 16px",borderBottom:"1px solid #1a1a1f",transition:"background 0.1s" }}
      onMouseEnter={e=>e.currentTarget.style.background="#18181b"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <div style={{ display:"flex",alignItems:"center",gap:"9px",minWidth:0 }}>
        {file.type==="folder" ? <Folder style={{ width:"16px",height:"16px",color:fileColor(file.icon),flexShrink:0 }}/> : <FileText style={{ width:"16px",height:"16px",color:fileColor(file.icon),flexShrink:0 }}/>}
        <span style={{ fontSize:"13px",color:"#e4e4e7",fontWeight:file.type==="folder"?500:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{file.name}</span>
        {file.type==="file" && <ExtBadge name={file.name}/>}
      </div>
      <span style={{ fontSize:"11px",color:"#71717a",fontFamily:"monospace" }}>{file.size}</span>
      <span style={{ fontSize:"11px",color:"#52525b" }}>{file.modified}</span>
      <div style={{ display:"flex",gap:"6px",justifyContent:"flex-end" }}>
        <button onClick={()=>handleEdit(file)} style={{ background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",borderRadius:"7px",padding:"4px 8px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",color:"#818cf8",fontSize:"11px",fontWeight:600 }}>
          {file.type==="folder" ? <FolderOpen style={{ width:"11px",height:"11px" }}/> : <Edit3 style={{ width:"11px",height:"11px" }}/>}
          {file.type==="folder" ? "Open" : "Edit"}
        </button>
        <button onClick={()=>handleDelete(file)} style={{ background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:"7px",padding:"4px 6px",cursor:"pointer",display:"flex",alignItems:"center",color:"#f87171" }}>
          <Trash2 style={{ width:"11px",height:"11px" }}/>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
          <div style={{ width:"28px",height:"28px",borderRadius:"8px",background:"rgba(251,191,36,0.15)",border:"1px solid rgba(251,191,36,0.3)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <FolderOpen style={{ width:"14px",height:"14px",color:"#fbbf24" }}/>
          </div>
          <span style={{ fontSize:"14px",fontWeight:700,color:"white" }}>File Manager</span>
          <span style={{ fontSize:"11px",color:"#52525b",background:"#18181b",border:"1px solid #27272a",borderRadius:"6px",padding:"2px 8px" }}>/server/</span>
        </div>
        <div style={{ position:"relative" }}>
          <Search style={{ position:"absolute",left:"9px",top:"50%",transform:"translateY(-50%)",width:"13px",height:"13px",color:"#52525b" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search files..." style={{ background:"#18181b",border:"1px solid #27272a",borderRadius:"10px",padding:"7px 12px 7px 28px",fontSize:"12px",color:"white",outline:"none",width:"180px" }}/>
        </div>
      </div>

      <div style={{ display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",color:"#52525b" }}>
        <span style={{ color:"#a78bfa",cursor:"pointer" }}>root</span>
        <ChevronRight style={{ width:"10px",height:"10px" }}/>
        <span style={{ color:"#d4d4d8" }}>server</span>
      </div>

      <div style={{ background:"#0f0f12",border:"1px solid #27272a",borderRadius:"14px",overflow:"hidden" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 80px 100px 90px",gap:"8px",padding:"8px 16px",borderBottom:"1px solid #1f1f23",background:"#18181b" }}>
          {["Name","Size","Modified","Actions"].map(h=>(
            <span key={h} style={{ fontSize:"10px",fontWeight:700,color:"#52525b",textTransform:"uppercase",letterSpacing:"0.5px",textAlign:h==="Actions"?"right":"left" }}>{h}</span>
          ))}
        </div>
        {folders.map(f=><Row key={f.id} file={f}/>)}
        {fileList.map(f=><Row key={f.id} file={f}/>)}
        {filtered.length===0 && <div style={{ textAlign:"center",padding:"32px",color:"#52525b",fontSize:"13px" }}>No files match "{search}"</div>}
      </div>

      <div style={{ fontSize:"11px",color:"#3f3f46",textAlign:"right" }}>{files.length} items · {folders.length} folders, {fileList.length} files</div>

      <Modal {...modal} open={!!modal} onCancel={()=>setModal(null)}/>

      {editModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(4px)" }}>
          <div style={{ background:"#18181b",border:"1px solid #3f3f46",borderRadius:"16px",maxWidth:"600px",width:"100%",overflow:"hidden" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid #27272a",background:"#0f0f12" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                <Edit3 style={{ width:"14px",height:"14px",color:"#818cf8" }}/>
                <span style={{ fontSize:"14px",fontWeight:700,color:"white" }}>{editModal.name}</span>
              </div>
              <button onClick={()=>setEditModal(null)} style={{ background:"none",border:"none",cursor:"pointer",color:"#52525b",display:"flex" }}><X style={{ width:"16px",height:"16px" }}/></button>
            </div>
            <textarea defaultValue={FILE_DEFAULTS[editModal.name]||"# "+editModal.name+"\n# Edit carefully. Changes may require a restart."} style={{ width:"100%",height:"220px",background:"#0a0a0f",border:"none",color:"#a1a1aa",fontFamily:"monospace",fontSize:"12px",padding:"16px",outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:"1.7" }}/>
            <div style={{ display:"flex",gap:"10px",padding:"14px 20px",borderTop:"1px solid #27272a",background:"#0f0f12" }}>
              <button onClick={()=>setEditModal(null)} style={{ flex:1,padding:"9px",borderRadius:"10px",border:"1px solid #3f3f46",background:"transparent",color:"#a1a1aa",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>{ setEditModal(null); showToast("\""+editModal.name+"\" saved successfully."); }} style={{ flex:2,padding:"9px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:"fixed",bottom:"24px",right:"24px",background:"#18181b",border:"1px solid "+toast.color+"44",borderRadius:"12px",padding:"12px 16px",display:"flex",alignItems:"center",gap:"10px",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",zIndex:999 }}>
          <span style={{ width:"8px",height:"8px",borderRadius:"50%",background:toast.color,flexShrink:0 }}/>
          <span style={{ fontSize:"13px",color:"#e4e4e7" }}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

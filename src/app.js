import { useState } from "react";
import {
  Server, Eye, EyeOff, LogOut, User,
  ArrowRight, Lock, Mail, AlertCircle,
  Download, Settings, Package,
} from "lucide-react";

import DownloadResolver from "./components/DownloadResolver";
import ServerConfig     from "./components/ServerConfig";

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PAGE
// ─────────────────────────────────────────────────────────────────────────────

function AuthPage({ onLogin }) {
  const [mode, setMode]         = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm]         = useState({ email: "", password: "", username: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !form.username) { setError("Username is required."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(form.username || form.email.split("@")[0]);
    }, 900);
  };

  const input = {
    width: "100%", background: "rgba(39,39,42,0.7)", border: "1px solid rgba(63,63,70,0.6)",
    borderRadius: "12px", padding: "10px 16px 10px 40px", fontSize: "14px",
    color: "white", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 0, left: "25%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(139,92,246,0.12),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "16px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)", marginBottom: "16px" }}>
            <Server style={{ width: "32px", height: "32px", color: "white" }} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>CraftHost</h1>
          <p style={{ color: "#71717a", fontSize: "14px", marginTop: "4px" }}>Premium Minecraft Hosting</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(24,24,27,0.9)", border: "1px solid rgba(63,63,70,0.6)", borderRadius: "20px", padding: "32px", backdropFilter: "blur(20px)" }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "rgba(39,39,42,0.8)", borderRadius: "12px", padding: "4px", marginBottom: "24px" }}>
            {["login", "signup"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "8px", fontSize: "14px", fontWeight: 500, borderRadius: "10px", border: "none", cursor: "pointer", transition: "all 0.2s", background: mode === m ? "#7c3aed" : "transparent", color: mode === m ? "white" : "#a1a1aa", boxShadow: mode === m ? "0 2px 8px rgba(124,58,237,0.4)" : "none" }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#a1a1aa", marginBottom: "6px" }}>Username</label>
                <div style={{ position: "relative" }}>
                  <User style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#71717a" }} />
                  <input name="username" value={form.username} onChange={handleChange} placeholder="Steve123" style={input} />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#a1a1aa", marginBottom: "6px" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#71717a" }} />
                <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" type="email" style={input} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#a1a1aa", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#71717a" }} />
                <input name="password" value={form.password} onChange={handleChange} placeholder="••••••••" type={showPass ? "text" : "password"} style={{ ...input, padding: "10px 40px" }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#71717a", display: "flex", padding: 0 }}>
                  {showPass ? <EyeOff style={{ width: "16px", height: "16px" }} /> : <Eye style={{ width: "16px", height: "16px" }} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f87171", fontSize: "13px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "10px 12px" }}>
                <AlertCircle style={{ width: "14px", height: "14px", flexShrink: 0 }} />{error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "white", fontWeight: 600, fontSize: "14px", padding: "11px", borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: "0 4px 16px rgba(124,58,237,0.3)", transition: "all 0.2s", marginTop: "4px" }}>
              {loading
                ? <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
                : <>{mode === "login" ? "Sign In" : "Create Account"}<ArrowRight style={{ width: "16px", height: "16px" }} /></>}
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#3f3f46", fontSize: "12px", marginTop: "20px" }}>
          Protected by CraftHost Security · 256-bit encryption
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

function Dashboard({ username, onLogout }) {
  const [tab, setTab] = useState("resolver");

  const tabs = [
    { id: "resolver", label: "Download Resolver", icon: Download },
    { id: "config",   label: "Server Config",     icon: Settings },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      {/* Grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      {/* Navbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid rgba(63,63,70,0.5)", background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Server style={{ width: "15px", height: "15px", color: "white" }} />
            </div>
            <span style={{ fontWeight: 700, color: "white", fontSize: "15px" }}>CraftHost</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(39,39,42,0.7)", border: "1px solid rgba(63,63,70,0.5)", borderRadius: "10px", padding: "6px 12px" }}>
              <User style={{ width: "12px", height: "12px", color: "#a78bfa" }} />
              <span style={{ fontSize: "13px", color: "#d4d4d8", fontWeight: 500 }}>{username}</span>
            </div>
            <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#71717a", fontSize: "13px", padding: "6px 8px", borderRadius: "8px" }}>
              <LogOut style={{ width: "14px", height: "14px" }} />Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px", position: "relative" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: "0 0 4px" }}>Dashboard — Phase 2</h1>
          <p style={{ color: "#71717a", fontSize: "14px", margin: 0 }}>Software logic, auto-installer & server configuration.</p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", background: "rgba(24,24,27,0.8)", border: "1px solid #27272a", borderRadius: "14px", padding: "4px", marginBottom: "20px", gap: "4px" }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "9px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, background: active ? "linear-gradient(135deg,#7c3aed,#6d28d9)" : "transparent", color: active ? "white" : "#71717a", boxShadow: active ? "0 2px 8px rgba(124,58,237,0.35)" : "none", transition: "all 0.2s" }}>
                <Icon style={{ width: "14px", height: "14px" }} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content card */}
        <div style={{ background: "rgba(24,24,27,0.7)", border: "1px solid #27272a", borderRadius: "20px", padding: "24px", backdropFilter: "blur(20px)" }}>
          {tab === "resolver" && <DownloadResolver />}
          {tab === "config"   && <ServerConfig />}
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <AuthPage onLogin={setUser} />;
  return <Dashboard username={user} onLogout={() => setUser(null)} />;
}
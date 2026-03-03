// =============================================================================
// middleware/auth.js
// CraftHost — Private Access Middleware
// =============================================================================
// HOW TO ADD A FRIEND:
//   1. Find the WHITELISTED_EMAILS array below
//   2. Add their email as a new string entry
//   3. Save the file — no restart needed if using nodemon
// =============================================================================

const jwt = require("jsonwebtoken");

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  WHITELIST — Add or remove emails here
// Only these emails can log in and access /dashboard
// ─────────────────────────────────────────────────────────────────────────────

const WHITELISTED_EMAILS = [
  "you@gmail.com",           // ← YOUR email (owner)
  "friend1@gmail.com",       // ← Friend 1
  "friend2@outlook.com",     // ← Friend 2
  // "friend3@gmail.com",    // ← Uncomment to add Friend 3
];

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  ADMIN EMAILS — These users get extra admin privileges in the UI
// Must also be in WHITELISTED_EMAILS above
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_EMAILS = [
  "you@gmail.com",           // ← Only you are admin by default
];

// ─────────────────────────────────────────────────────────────────────────────
// isWhitelisted — Check if an email is allowed
// ─────────────────────────────────────────────────────────────────────────────

function isWhitelisted(email) {
  if (!email) return false;
  return WHITELISTED_EMAILS.map((e) => e.toLowerCase().trim()).includes(
    email.toLowerCase().trim()
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// isAdmin — Check if an email has admin flag
// ─────────────────────────────────────────────────────────────────────────────

function isAdmin(email) {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase().trim()).includes(
    email.toLowerCase().trim()
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// checkWhitelist — Express middleware
// Attach to any route that needs private access
// Usage: router.get("/dashboard", checkWhitelist, (req, res) => { ... })
// ─────────────────────────────────────────────────────────────────────────────

function checkWhitelist(req, res, next) {
  const token = req.cookies?.crafthost_token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "ACCESS_DENIED",
      message: "Access Denied: Private Instance. No session found.",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || "crafthost_secret_change_me");
  } catch (err) {
    return res.status(401).json({
      error: "ACCESS_DENIED",
      message: "Access Denied: Invalid or expired session.",
    });
  }

  if (!isWhitelisted(decoded.email)) {
    console.warn(`[AUTH] Blocked access attempt from: ${decoded.email}`);
    return res.status(403).json({
      error: "ACCESS_DENIED",
      message: "Access Denied: Private Instance. This account is not authorized.",
    });
  }

  // Attach user info to request for downstream handlers
  req.user = {
    email:   decoded.email,
    username: decoded.username,
    isAdmin: isAdmin(decoded.email),
  };

  next();
}

// ─────────────────────────────────────────────────────────────────────────────
// requireAdmin — Stricter middleware for admin-only routes
// Usage: router.post("/server/kill", checkWhitelist, requireAdmin, handler)
// ─────────────────────────────────────────────────────────────────────────────

function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      error: "ADMIN_REQUIRED",
      message: "This action requires admin privileges.",
    });
  }
  next();
}

module.exports = { checkWhitelist, requireAdmin, isWhitelisted, isAdmin };

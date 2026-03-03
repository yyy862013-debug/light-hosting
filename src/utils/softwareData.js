// ─────────────────────────────────────────────────────────────────────────────
// SOFTWARE REGISTRY
// Every Minecraft server software, its download URL resolver, file type,
// and install metadata. Import this wherever you need software logic.
// ─────────────────────────────────────────────────────────────────────────────

export const SOFTWARE_REGISTRY = {
  // ── Java Edition ────────────────────────────────────────────────────────────
  vanilla: {
    name: "Vanilla",
    type: "jar",
    color: "#f97316",
    badge: "Official",
    category: "java",
    resolveUrl: (version) =>
      `https://launchermeta.mojang.com/mc/game/version_manifest.json`,
    note: "Fetches Mojang version manifest, then resolves the server JAR URL per version.",
  },
  snapshot: {
    name: "Snapshot",
    type: "jar",
    color: "#fb923c",
    badge: "Experimental",
    category: "java",
    resolveUrl: (version) =>
      `https://launchermeta.mojang.com/mc/game/version_manifest.json`,
    note: "Same as Vanilla — resolves experimental snapshot builds from Mojang manifest.",
  },

  // ── Plugin Servers ──────────────────────────────────────────────────────────
  paper: {
    name: "Paper",
    type: "jar",
    color: "#10b981",
    badge: "Recommended",
    category: "plugins",
    apiBase: "https://api.papermc.io/v2/projects/paper",
    resolveUrl: (version) =>
      `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/latest/downloads/paper-${version}-latest.jar`,
    note: "Uses PaperMC REST API — fetches the latest build number for the given MC version, then constructs the JAR download URL.",
  },
  spigot: {
    name: "Spigot",
    type: "jar",
    color: "#f59e0b",
    badge: "Plugin Support",
    category: "plugins",
    resolveUrl: (version) =>
      `https://download.getbukkit.org/spigot/spigot-${version}.jar`,
    note: "Direct download from GetBukkit CDN. No API call needed.",
  },
  purpur: {
    name: "Purpur",
    type: "jar",
    color: "#a855f7",
    badge: "Feature Rich",
    category: "plugins",
    apiBase: "https://api.purpurmc.org/v2/purpur",
    resolveUrl: (version) =>
      `https://api.purpurmc.org/v2/purpur/${version}/latest/download`,
    note: "Uses PurpurMC REST API — /latest/download always returns the newest build for that MC version.",
  },
  glowstone: {
    name: "Glowstone",
    type: "jar",
    color: "#eab308",
    badge: "Open Source",
    category: "plugins",
    resolveUrl: (version) =>
      `https://repo.glowstone.net/service/rest/v1/search/assets/download?sort=version&repository=snapshots&group=net.glowstone&name=glowstone&extension=jar`,
    note: "Fetches from Glowstone's Nexus snapshot repository.",
  },

  // ── Mod Loaders ─────────────────────────────────────────────────────────────
  fabric: {
    name: "Fabric",
    type: "jar",
    color: "#6366f1",
    badge: "Mod Loader",
    category: "mods",
    apiBase: "https://meta.fabricmc.net/v2/versions",
    resolveUrl: (version) =>
      `https://meta.fabricmc.net/v2/versions/loader/${version}/stable/1/server/jar`,
    note: "FabricMC meta API — downloads a server installer JAR that auto-installs Fabric for the given MC version.",
  },
  quilt: {
    name: "Quilt",
    type: "jar",
    color: "#8b5cf6",
    badge: "Mod Loader",
    category: "mods",
    resolveUrl: (version) =>
      `https://meta.quiltmc.org/v3/versions/loader/${version}/stable/1/server/jar`,
    note: "QuiltMC meta API — same pattern as Fabric, produces a server installer JAR.",
  },
  neoforge: {
    name: "NeoForge",
    type: "jar",
    color: "#ef4444",
    badge: "Mod Loader",
    category: "mods",
    resolveUrl: (version) =>
      `https://maven.neoforged.net/releases/net/neoforged/neoforge/${version}/neoforge-${version}-installer.jar`,
    note: "NeoForged Maven repository — downloads the installer JAR which sets up the server libraries.",
  },
  forge: {
    name: "Forge",
    type: "jar",
    color: "#dc2626",
    badge: "Classic Mods",
    category: "mods",
    resolveUrl: (version) =>
      `https://maven.minecraftforge.net/net/minecraftforge/forge/${version}-latest/forge-${version}-latest-installer.jar`,
    note: "MinecraftForge Maven — downloads the installer JAR. Run with --installServer flag on first launch.",
  },

  // ── Bedrock ─────────────────────────────────────────────────────────────────
  bedrock: {
    name: "Bedrock",
    type: "zip",
    color: "#0ea5e9",
    badge: "Bedrock",
    category: "bedrock",
    isZipExtract: true,
    extractType: "binary",
    resolveUrl: (version) =>
      `https://minecraft.azureedge.net/bin-linux/bedrock-server-${version}.zip`,
    note: "Downloads ZIP from Microsoft CDN. Extract and run the bedrock_server binary inside.",
  },
  pocketmine: {
    name: "PocketMine-MP",
    type: "phar",
    color: "#06b6d4",
    badge: "Bedrock PHP",
    category: "bedrock",
    resolveUrl: (version) =>
      `https://github.com/pmmp/PocketMine-MP/releases/download/${version}/PocketMine-MP.phar`,
    note: "GitHub Releases — downloads the .phar PHP archive. Requires PHP 8.x runtime.",
  },

  // ── Modpacks (ZIP / mrpack — extraction required) ───────────────────────────
  modpack_ftb: {
    name: "FTB Modpack",
    type: "zip",
    color: "#f97316",
    badge: "Modpack",
    category: "modpacks",
    isModpack: true,
    isZipExtract: true,
    extractType: "modpack",
    resolveUrl: (version) =>
      `https://api.feed-the-beast.com/v1/modpacks/${version}/download`,
    note: "⚠ ZIP extraction required. Parse manifest.json, then download each mod JAR + config.",
  },
  modpack_curseforge: {
    name: "CurseForge Pack",
    type: "zip",
    color: "#f97316",
    badge: "Modpack",
    category: "modpacks",
    isModpack: true,
    isZipExtract: true,
    extractType: "modpack",
    resolveUrl: (version) =>
      `https://www.curseforge.com/api/v1/mods/${version}/files/latest/download`,
    note: "⚠ ZIP extraction required. Reads manifest.json for mod file IDs, then downloads each.",
  },
  modpack_modrinth: {
    name: "Modrinth Pack",
    type: "mrpack",
    color: "#16a34a",
    badge: "Modpack",
    category: "modpacks",
    isModpack: true,
    isZipExtract: true,
    extractType: "modpack",
    resolveUrl: (version) =>
      `https://api.modrinth.com/v2/version/${version}/download`,
    note: "⚠ .mrpack extraction required. Reads modrinth.index.json to resolve all download URLs.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// VERSION MAP
// Maps each software ID → available versions shown in the UI dropdown.
// ─────────────────────────────────────────────────────────────────────────────

export const VERSION_MAP = {
  vanilla:            ["1.21.1", "1.20.4", "1.20.1", "1.19.4", "1.18.2", "1.17.1", "1.16.5"],
  snapshot:           ["24w33a", "24w18a", "23w51b", "23w45a"],
  paper:              ["1.21.1", "1.20.6", "1.20.4", "1.20.1", "1.19.4", "1.18.2"],
  spigot:             ["1.21.1", "1.20.4", "1.20.1", "1.19.4", "1.18.2", "1.17.1"],
  purpur:             ["1.21.1", "1.20.4", "1.20.1", "1.19.4", "1.18.2"],
  glowstone:          ["1.12.2", "1.10.2"],
  fabric:             ["1.21.1", "1.20.4", "1.20.1", "1.19.4", "1.18.2", "1.16.5"],
  quilt:              ["1.21.1", "1.20.4", "1.20.1", "1.19.4"],
  neoforge:           ["1.21.1", "1.20.4", "1.20.1"],
  forge:              ["1.21.1", "1.20.4", "1.20.1", "1.19.4", "1.18.2", "1.16.5", "1.12.2"],
  bedrock:            ["1.21.2", "1.21.0", "1.20.80", "1.20.40"],
  pocketmine:         ["5.7.0", "5.6.1", "5.5.3", "4.23.6"],
  modpack_ftb:        ["Pack-ID-123", "Pack-ID-456"],
  modpack_curseforge: ["Mod-ID-789", "Mod-ID-321"],
  modpack_modrinth:   ["version-abc", "version-xyz"],
};

// ─────────────────────────────────────────────────────────────────────────────
// SOFTWARE GROUPS
// Used by the UI dropdowns and wizard grid.
// ─────────────────────────────────────────────────────────────────────────────

export const SOFTWARE_GROUPS = [
  {
    id: "java",
    label: "Java Edition",
    emoji: "☕",
    ids: ["vanilla", "snapshot"],
  },
  {
    id: "plugins",
    label: "Plugins",
    emoji: "🔌",
    ids: ["paper", "spigot", "purpur", "glowstone"],
  },
  {
    id: "mods",
    label: "Mod Loaders",
    emoji: "🧩",
    ids: ["fabric", "quilt", "neoforge", "forge"],
  },
  {
    id: "bedrock",
    label: "Bedrock",
    emoji: "📦",
    ids: ["bedrock", "pocketmine"],
  },
  {
    id: "modpacks",
    label: "Modpacks",
    emoji: "🗜",
    ids: ["modpack_ftb", "modpack_curseforge", "modpack_modrinth"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// resolveDownload()
// Core function — call this when the user hits "Deploy" or "Install".
// Returns everything the backend needs to download and install the server.
// ─────────────────────────────────────────────────────────────────────────────

export function resolveDownload(softwareId, version) {
  const entry = SOFTWARE_REGISTRY[softwareId];
  if (!entry) {
    return { error: `Unknown software ID: "${softwareId}"` };
  }

  const url = entry.resolveUrl(version);
  const isZipExtract = entry.isZipExtract || entry.type === "zip" || entry.type === "mrpack";
  const isModpack = !!entry.isModpack;

  // Build install pipeline steps shown in the UI
  const installSteps = isModpack
    ? [
        "Download archive",
        "Validate checksum",
        "Extract archive",
        "Parse manifest",
        "Download mod JARs",
        "Copy config files",
        "Write eula.txt",
        "Launch server",
      ]
    : isZipExtract
    ? [
        "Download ZIP",
        "Validate checksum",
        "Extract archive",
        "Set binary permissions",
        "Write eula.txt",
        "Launch server",
      ]
    : [
        "Download JAR",
        "Validate checksum",
        "Write eula.txt",
        "Launch server",
      ];

  return {
    softwareId,
    software:     entry.name,
    version,
    downloadUrl:  url,
    fileType:     entry.type,
    isZipExtract,
    isModpack,
    extractType:  entry.extractType || null,
    installSteps,
    note:         entry.note,
    color:        entry.color,
    badge:        entry.badge,
    apiBase:      entry.apiBase || null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT SERVER CONFIG
// Matches keys in server.properties. These are the settings tracked for
// the "Pending Restart" badge logic.
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_SERVER_CONFIG = {
  maxPlayers:      20,
  difficulty:      "normal",      // peaceful | easy | normal | hard
  gamemode:        "survival",    // survival | creative | adventure | spectator
  whitelist:       false,
  levelType:       "default",     // default | flat | largeBiomes | amplified | buffet
  pvp:             true,
  spawnProtection: 16,
  viewDistance:    10,
};

// These keys trigger a "Pending Restart" badge when changed
export const RESTART_REQUIRED_KEYS = [
  "maxPlayers",
  "difficulty",
  "gamemode",
  "whitelist",
  "levelType",
  "pvp",
  "spawnProtection",
  "viewDistance",
];
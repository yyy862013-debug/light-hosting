export const SOFTWARE_REGISTRY = {
  vanilla:{ name:"Vanilla", type:"jar", color:"#f97316", badge:"Official", category:"java", resolveUrl:(v)=>`https://launchermeta.mojang.com/mc/game/version_manifest.json`, note:"Fetches Mojang manifest then resolves JAR URL per version." },
  snapshot:{ name:"Snapshot", type:"jar", color:"#fb923c", badge:"Experimental", category:"java", resolveUrl:(v)=>`https://launchermeta.mojang.com/mc/game/version_manifest.json`, note:"Resolves experimental snapshot builds from Mojang manifest." },
  paper:{ name:"Paper", type:"jar", color:"#10b981", badge:"Recommended", category:"plugins", apiBase:"https://api.papermc.io/v2/projects/paper", resolveUrl:(v)=>`https://api.papermc.io/v2/projects/paper/versions/${v}/builds/latest/downloads/paper-${v}-latest.jar`, note:"Uses PaperMC REST API — fetches latest build for the given MC version." },
  spigot:{ name:"Spigot", type:"jar", color:"#f59e0b", badge:"Plugin Support", category:"plugins", resolveUrl:(v)=>`https://download.getbukkit.org/spigot/spigot-${v}.jar`, note:"Direct download from GetBukkit CDN." },
  purpur:{ name:"Purpur", type:"jar", color:"#a855f7", badge:"Feature Rich", category:"plugins", resolveUrl:(v)=>`https://api.purpurmc.org/v2/purpur/${v}/latest/download`, note:"Uses PurpurMC REST API — /latest/download returns newest build." },
  glowstone:{ name:"Glowstone", type:"jar", color:"#eab308", badge:"Open Source", category:"plugins", resolveUrl:(v)=>`https://repo.glowstone.net/service/rest/v1/search/assets/download?sort=version&repository=snapshots&group=net.glowstone&name=glowstone&extension=jar`, note:"Fetches from Glowstone Nexus snapshot repository." },
  fabric:{ name:"Fabric", type:"jar", color:"#6366f1", badge:"Mod Loader", category:"mods", resolveUrl:(v)=>`https://meta.fabricmc.net/v2/versions/loader/${v}/stable/1/server/jar`, note:"FabricMC meta API — server installer JAR." },
  quilt:{ name:"Quilt", type:"jar", color:"#8b5cf6", badge:"Mod Loader", category:"mods", resolveUrl:(v)=>`https://meta.quiltmc.org/v3/versions/loader/${v}/stable/1/server/jar`, note:"QuiltMC meta API — server installer JAR." },
  neoforge:{ name:"NeoForge", type:"jar", color:"#ef4444", badge:"Mod Loader", category:"mods", resolveUrl:(v)=>`https://maven.neoforged.net/releases/net/neoforged/neoforge/${v}/neoforge-${v}-installer.jar`, note:"NeoForged Maven — installer JAR." },
  forge:{ name:"Forge", type:"jar", color:"#dc2626", badge:"Classic Mods", category:"mods", resolveUrl:(v)=>`https://maven.minecraftforge.net/net/minecraftforge/forge/${v}-latest/forge-${v}-latest-installer.jar`, note:"MinecraftForge Maven — installer JAR." },
  bedrock:{ name:"Bedrock", type:"zip", color:"#0ea5e9", badge:"Bedrock", category:"bedrock", isZipExtract:true, extractType:"binary", resolveUrl:(v)=>`https://minecraft.azureedge.net/bin-linux/bedrock-server-${v}.zip`, note:"Downloads ZIP from Microsoft CDN. Extract and run bedrock_server binary." },
  pocketmine:{ name:"PocketMine-MP", type:"phar", color:"#06b6d4", badge:"Bedrock PHP", category:"bedrock", resolveUrl:(v)=>`https://github.com/pmmp/PocketMine-MP/releases/download/${v}/PocketMine-MP.phar`, note:"GitHub Releases — .phar PHP archive. Requires PHP 8.x." },
  modpack_ftb:{ name:"FTB Modpack", type:"zip", color:"#f97316", badge:"Modpack", category:"modpacks", isModpack:true, isZipExtract:true, extractType:"modpack", resolveUrl:(v)=>`https://api.feed-the-beast.com/v1/modpacks/${v}/download`, note:"ZIP extraction required. Parse manifest.json then download each mod JAR." },
  modpack_curseforge:{ name:"CurseForge Pack", type:"zip", color:"#f97316", badge:"Modpack", category:"modpacks", isModpack:true, isZipExtract:true, extractType:"modpack", resolveUrl:(v)=>`https://www.curseforge.com/api/v1/mods/${v}/files/latest/download`, note:"ZIP extraction required. Reads manifest.json for mod file IDs." },
  modpack_modrinth:{ name:"Modrinth Pack", type:"mrpack", color:"#16a34a", badge:"Modpack", category:"modpacks", isModpack:true, isZipExtract:true, extractType:"modpack", resolveUrl:(v)=>`https://api.modrinth.com/v2/version/${v}/download`, note:".mrpack extraction required. Reads modrinth.index.json to resolve all URLs." },
};

export const VERSION_MAP = {
  vanilla:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.17.1","1.16.5"],
  snapshot:["24w33a","24w18a","23w51b","23w45a"],
  paper:["1.21.1","1.20.6","1.20.4","1.20.1","1.19.4","1.18.2"],
  spigot:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.17.1"],
  purpur:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2"],
  glowstone:["1.12.2","1.10.2"],
  fabric:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.16.5"],
  quilt:["1.21.1","1.20.4","1.20.1","1.19.4"],
  neoforge:["1.21.1","1.20.4","1.20.1"],
  forge:["1.21.1","1.20.4","1.20.1","1.19.4","1.18.2","1.16.5","1.12.2"],
  bedrock:["1.21.2","1.21.0","1.20.80","1.20.40"],
  pocketmine:["5.7.0","5.6.1","5.5.3","4.23.6"],
  modpack_ftb:["Pack-ID-123","Pack-ID-456"],
  modpack_curseforge:["Mod-ID-789","Mod-ID-321"],
  modpack_modrinth:["version-abc","version-xyz"],
};

export const SOFTWARE_GROUPS = [
  { id:"java", label:"Java Edition", emoji:"☕", ids:["vanilla","snapshot"] },
  { id:"plugins", label:"Plugins", emoji:"🔌", ids:["paper","spigot","purpur","glowstone"] },
  { id:"mods", label:"Mod Loaders", emoji:"🧩", ids:["fabric","quilt","neoforge","forge"] },
  { id:"bedrock", label:"Bedrock", emoji:"📦", ids:["bedrock","pocketmine"] },
  { id:"modpacks", label:"Modpacks", emoji:"🗜", ids:["modpack_ftb","modpack_curseforge","modpack_modrinth"] },
];

export function resolveDownload(softwareId, version) {
  const entry = SOFTWARE_REGISTRY[softwareId];
  if (!entry) return { error: `Unknown software ID: "${softwareId}"` };
  const url = entry.resolveUrl(version);
  const isZipExtract = entry.isZipExtract || entry.type==="zip" || entry.type==="mrpack";
  const isModpack = !!entry.isModpack;
  const installSteps = isModpack
    ? ["Download archive","Validate checksum","Extract archive","Parse manifest","Download mod JARs","Copy config files","Write eula.txt","Launch server"]
    : isZipExtract
    ? ["Download ZIP","Validate checksum","Extract archive","Set binary permissions","Write eula.txt","Launch server"]
    : ["Download JAR","Validate checksum","Write eula.txt","Launch server"];
  return { softwareId, software:entry.name, version, downloadUrl:url, fileType:entry.type, isZipExtract, isModpack, extractType:entry.extractType||null, installSteps, note:entry.note, color:entry.color, badge:entry.badge };
}

export const DEFAULT_SERVER_CONFIG = {
  maxPlayers:20, difficulty:"normal", gamemode:"survival",
  whitelist:false, levelType:"default", pvp:true,
  spawnProtection:16, viewDistance:10,
};

export const RESTART_REQUIRED_KEYS = [
  "maxPlayers","difficulty","gamemode","whitelist",
  "levelType","pvp","spawnProtection","viewDistance",
];

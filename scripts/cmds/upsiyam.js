const os = require("os");
const fs = require("fs");
const path = require("path");

function getSessionUptimeString() {
  const sessionPath = "/home/leader/Abir_01/session_active.json";
  let startedAt = Date.now();

  if (fs.existsSync(sessionPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
      if (parsed && typeof parsed.startedAt === "number") {
        startedAt = parsed.startedAt;
      }
    } catch (e) {}
  } else {
    try {
      fs.writeFileSync(sessionPath, JSON.stringify({ startedAt }, null, 2));
    } catch (e) {}
  }

  const t = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function formatUptMessage({ uptimeString, cpu, cores, usedMem, totalMem, hostname, prefix, totalUsers }) {
  return `
╭────────────◊⚡🏴‍☠️

—͟͞͞⸙⸙ 𝗨͜͡𝗽𝘁𝗶𝗺𝗲ღ❗🌪️—͟͞͞𝗦𝘆͜͡𝘀𝘁𝗲𝗺 

───❯❯⸙⸙🍷🚩 𝗨͟𝗽͟͠𝘁͟𝗶͟𝗺͟𝗲͟ : ${uptimeString}

───❯❯⸙ꪾ🌪️☠️❗ 𝗖͟𝗽͟͠𝘂͟ : ${cpu} (${cores} cores)

───⚠〄💫 𝗥𝗔𝗠 : ${usedMem.toFixed(2)} / ${totalMem.toFixed(2)} MB

────────⦿ 𝗛𝗼𝘀𝘁ღ 👀 : ${hostname}

──────◊ 𝗣𝗥𝗘⃟𝗙𝗜𝗫 ☠️❗ : ${prefix}

──────⦿ 𝗨𝘀𝗲͜͡𝗿 :☄️ ${totalUsers}💥💫

𝐖𝐡𝐨 𝐢͜͡𝐚𝐦 𝐲𝐨𝐮 𝐡𝐚𝐯𝐞 𝐧𝐨 𝐢𝐝𝐞𝐚 🚩
𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 𝐕𝐢𝐫𝐮𝐬 Abir__ 🍾❕

╰────────────◊☄️👀❕
`;
}

module.exports = {
  config: {
    name: "up",
    version: "2.4",
    author: "xnil6x",
    role: 0,
    category: "system",
    guide: "upt"
  },

  onStart: async function ({ message, threadsData }) {
    await sendUpt(message, threadsData);
  },

  onChat: async function ({ message, event, threadsData }) {
    if (!event.body || event.body.toLowerCase() !== "up") return;
    await sendUpt(message, threadsData);
  }
};

async function sendUpt(message, threadsData) {
  const uptimeString = getSessionUptimeString();

  const cpu = os.cpus()[0].model;
  const cores = os.cpus().length;
  const usedMem = (os.totalmem() - os.freemem()) / 1024 / 1024;
  const totalMem = os.totalmem() / 1024 / 1024;

  const prefix = global.GoatBot?.config?.PREFIX || "/";
  const totalUsers = (await threadsData.getAll()).length;

  const body = formatUptMessage({ uptimeString, cpu, cores, usedMem, totalMem, hostname: os.hostname(), prefix, totalUsers });

  message.reply({
    body,
    attachment: await global.utils.getStreamFromUrl("https://files.catbox.moe/ecsut1.jpg")
  });
}

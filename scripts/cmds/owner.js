const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "Tokodori", // Converted by GoatBot Mostakim
    role: 0,
    shortDescription: "Show owner information",
    longDescription: "Displays information about the bot owner along with a video.",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: '𝐅𝐚𝐢𝐬𝐚𝐥 𝐊𝐡𝐚𝐧 𝐀𝐛𝐢𝐫',
        gender: '𝐌𝐀𝐋𝐄👾🌪️',
        nick: '𝐀𝐛𝐢𝐫 ⚠️‍☠  '
      };

      const videoUrl = 'https://drive.google.com/uc?export=download&id=1Z_c-Mc1cqjcbUdnlwm2AZ76BGbgqBXnT';
      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
╭────────────◊
├─⦿ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├─⦿ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
├─⦿ 𝗩𝗶͜͡𝗿𝘂𝘀 𝗔𝗹𝗲𝗿𝘁⚡📨
├─⦿ 𝗢𝗽𝗽͜͡𝘀𝘀𝘀 ....... 🎭
├─⦿ 𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝘄𝗼𝗿𝗱 :𝐄𝐫𝐫𝐨𝐫 👑📌
├─⦿ 𝗛𝗼𝗯𝗯𝘆 : 𝐂𝐫𝐢𝐜𝐤𝐞𝐭 🎭
├─⦿ ⚡ 📨🍷
├─⦿ 𝐈'𝐦 𝐒𝐢𝐦𝐩𝐥𝐞 𝐁𝐨𝐲 ⚡
├─⦿ ⁷¹³𝗟𝗢𝗔𝗗𝗜𝗡𝗚...........................👾
├─⦿ 𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}
├─⦿ 𝐍𝐢𝐜𝐤 : ${ownerInfo.nick}
╰────────────◊
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);

    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};

// =============================================
// VERSION UPDATE
// UPDATE TERAKHIR 30 September 2024 JAM 00:00 WIB
// WEBSITE : ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢'𝐕
// VERSION : 3.5.3
// =============================================



const fs = require("fs"),
  chalk = require("chalk"),
  moment = require("moment-timezone");

global.mess = {
  success: "ᴅᴏɴᴇ ʏᴀ ᴀɴᴊᴊ",
  admin: "_❗ᴋʜᴜꜱᴜꜱ ᴀᴅᴍɪɴ ᴛᴏᴅᴅ, ɴɢᴀᴘᴀɪɴ ʟᴜᴜ??",
  owner: "_❗ꜰɪᴛᴜʀ ɪɴɪ ᴋʜᴜꜱᴜꜱ ʙᴀɴɢ ɪʟᴍɪ ʏᴀ",
  superOwner: "_❗𝐌𝐚𝐮 𝐍𝐠𝐚𝐩𝐚𝐢𝐧 𝐬𝐢𝐡 𝐀𝐧𝐚𝐤 𝐂𝐮𝐫𝐮𝐭🐀 𝐊𝐡𝐮𝐬𝐮𝐬 𝐒𝐮𝐩𝐞𝐫 𝐎𝐰𝐧𝐞𝐫 !_",
  group: "_❗Perintah Ini Hanya Bisa Digunakan Di Group Chat !_",
  private: "_❗Perintah Ini Hanya Bisa Digunakan Di Private Chat !_",
  bot: "_🤖 Fitur Khusus Pengguna Nomor Bot !_",
  wait: "_⏳ ꜱᴀʙᴀʀ ʟᴀɢɪ ᴘʀᴏꜱᴇꜱ ᴀɴᴊᴊ !_",
  error: "_🚫 ᴋᴜʀᴀɴɢ ᴀᴍᴀʟ ᴅᴀɴ ɪʙᴀᴅᴀʜ, ᴊᴀᴅɪɴʏᴀ ᴇʀᴏʀ! !_",
  premium: "🚫 𝐅𝐢𝐭𝐮𝐫 𝐊𝐡𝐮𝐬𝐮𝐬 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐀𝐧𝐚𝐤 𝐂𝐮𝐫𝐮𝐭 🐀!\n\n♨️ 𝐁𝐞𝐥𝐢 𝐤𝐞 𝐨𝐰𝐧𝐞𝐫",
  notlink: "_ʟɪɴᴋ ɴʏᴀ ᴍᴀɴᴀ ᴛᴏᴅᴅ?? ❗_",
  gagal: "_🚫 ʜᴀʜᴀ ɢᴀɢᴀʟ!_",
  urlnotvalid: "_🚫 Link Tidak Valid_",
  ban: "_🚫 Akun Kamu Sudah Di Baned Dari Penggunaan Bot Ini_",
  response_failed:
    "_🚫 *Response Ke Server Gagal Coba Ketik .updatebot untuk memperbaiki masalah*_\n\n_Apabila Butuh Bantuan Silakan Hubungi_\nOwner",
  promote_admin: "ᴅᴀʜ ᴊᴀᴅɪ ᴀᴅᴍɪɴ ɢᴀᴜꜱᴀʜ ᴊᴀᴅɪ ʙᴇʙᴀɴ ʏᴀ🔥",
  demote_admin: "",
  notGroup: "Buat Di Group Ya Kak!",
  botNotAdmin: "ᴊᴀᴅɪɪɴ ɢᴜᴀ ᴀᴅᴍɪɴ ᴅᴜʟᴜ ɴᴊɪʀʀ😒",
  userNotAdmin: "𝙽𝚐𝚊𝚙𝚊𝚒𝚗 𝙻𝚞 𝘼𝙣𝙖𝙠 𝚌𝚞𝚛𝚞𝚝🐀𝙺𝚑𝚞𝚜𝚞𝚜 𝙰𝚍𝚖𝚒𝚗",
  antispam1:
    "_𝙋𝙚𝙧𝙞𝙣𝙜𝙖𝙩𝙖𝙣 𝙔𝙖𝙝 𝘼𝙣𝙖𝙠 𝘾𝙪𝙧𝙪𝙩 🐀 𝙅𝙖𝙣𝙜𝙖𝙣 𝙎𝙥𝙖𝙢 𝘼𝙩𝙖𝙪 𝘼𝙠𝙖𝙣 𝘿𝙞 𝙏𝙚𝙣𝙙𝙖𝙣𝙜._",
  antispam2: "_𝙋𝙚𝙧𝙞𝙣𝙜𝙖𝙩𝙖𝙣 𝙔𝙖𝙝 𝘼𝙣𝙖𝙠 𝘾𝙪𝙧𝙪𝙩 🐀 𝙅𝙖𝙣𝙜𝙖𝙣 𝙎𝙥𝙖𝙢 𝘼𝙩𝙖𝙪 𝘼𝙠𝙖𝙣 𝘿𝙞 𝙏𝙚𝙣𝙙𝙖𝙣𝙜_",
};

global.singlemess = {
  mute: "_Bot berhasil dimute di grub ini_",
  unmute: "_Bot telah diunmute di grup ini_",
  antilink_notAdmin: "「 *ANTILINK TERDETEKSI* 」 BOT NOT ADMIN",
  antilinkwa_notAdmin: "「 *ANTILINK WA TERDETEKSI* 」 BOT NOT ADMIN",
  antigame:
    "_Tidak Dapat Bermain Game_ \n\n_Fitur Game Telah Di Nonaktifkan Untuk Group Ini_",
  antibadword:
    "_🚫 𝙿𝚎𝚛𝚒𝚗𝚐𝚊𝚝𝚊𝚗 𝚃𝚎𝚛𝚊𝚔𝚑𝚒𝚛 𝚈𝚊𝚑 𝚌𝚞𝚛𝚞𝚝🐀_ \n\n_𝙺𝚊𝚕𝚘 𝚃𝚒𝚍𝚊𝚔 𝙺𝚊𝚖𝚞 𝙰𝚔𝚊𝚗 𝙳𝚒 𝚝𝚎𝚗𝚍𝚊𝚗𝚐",
  kickmember: "Lapor Tuan Anak Curut🐀Udah Di Tendang",
  open_grub: "_*𝙶𝚛𝚘𝚞𝚙 𝙱𝚎𝚛𝚑𝚊𝚜𝚒𝚕 𝙳𝚒 𝙱𝚞𝚔𝚊*_ 「 🔓 」",
  close_grub: "_*𝙶𝚛𝚘𝚞𝚙 𝙱𝚎𝚛𝚑𝚊𝚜𝚒𝚕 𝙳𝚒 𝚃𝚞𝚝𝚞𝚙*_ 「 🔒 」",
  antisekalilihat: "_「 *ANTI SEKALI LIHAT AKTIF* 」",

  antilinkv1_detek: "",
  antilinkv2_detek: "",
  antilinkv3_detek: "",
  antilinkwa_detek: "",
  antilinkwa2_detek: "",
  antivirtex_detek: "_ANTI VIRTEX DETEX, KAMU AKAN DI KICK_",
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file),
    console.log(`${chalk.greenBright.bold(`UPDATE FILE ${__filename}`)}`),
    delete require.cache[file],
    require(file);
});

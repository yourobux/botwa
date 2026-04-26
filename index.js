const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");

const NOMOR_WA = "6285770538628";
const ADMIN = "6285770538628@s.whatsapp.net";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    mobile: false
  });

  sock.ev.on("creds.update", saveCreds);

  // Minta pairing code langsung
  if (!sock.authState.creds.registered) {
    setTimeout(async function() {
      try {
        const code = await sock.requestPairingCode(NOMOR_WA);
        console.log("=============================");
        console.log("PAIRING CODE: " + code);
        console.log("Masukkan kode ini di WA > Perangkat Tertaut");
        console.log("=============================");
      } catch(e) {
        console.log("Error pairing: " + e.message);
      }
    }, 3000);
  }

  sock.ev.on("connection.update", async function(update) {
    const connection = update.connection;
    const lastDisconnect = update.lastDisconnect;

    if (connection === "open") {
      console.log("Bot terhubung!");
    }

    if (connection === "close") {
      const kode = lastDisconnect && lastDisconnect.error && lastDisconnect.error.output ? lastDisconnect.error.output.statusCode : 0;
      if (kode !== DisconnectReason.loggedOut) {
        startBot();
      }
    }
  });

  sock.ev.on("messages.upsert", async function(m) {
    const msg = m.messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const isAdmin = sender === ADMIN;
    const text = msg.message.conversation || (msg.message.extendedTextMessage ? msg.message.extendedTextMessage.text : "") || "";

    if (from.endsWith("@g.us") && text.includes("chat.whatsapp.com/")) {
      await sock.sendMessage(from, { delete: msg.key });
      await sock.sendMessage(from, { text: "Dilarang kirim link grup!" });
      return;
    }

    if (!isAdmin) return;

    if (text === ".kick") {
      const target = msg.message.extendedTextMessage && msg.message.extendedTextMessage.contextInfo ? msg.message.extendedTextMessage.contextInfo.participant : null;
      if (!target) {
        await sock.sendMessage(from, { text: "Reply pesan member yang mau di kick!" });
        return;
      }
      await sock.groupParticipantsUpdate(from, [target], "remove");
      await sock.sendMessage(from, { text: "Member berhasil di kick!" });
    }

    if (text === ".tagall") {
      const metadata = await sock.groupMetadata(from);
      const members = metadata.participants.map(function(p) { return p.id; });
      let mention = "";
      for (let i = 0; i < members.length; i++) {
        mention += "@" + members[i].split("@")[0] + "\n";
      }
      await sock.sendMessage(from, { text: mention, mentions: members });
    }

    if (text === ".info") {
      await sock.sendMessage(from, { text: "Bot WA\n\nCommand:\n.kick - Kick member\n.tagall - Tag semua\n.info - Info bot" });
    }
  });
}

startBot();

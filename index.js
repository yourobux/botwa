const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const P = require("pino");
const NOMOR_WA = "6285770538628";
const ADMIN = "6285770538628@s.whatsapp.net";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" }))
    }
  });

  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      const code = await sock.requestPairingCode(NOMOR_WA);
      console.log("PAIRING CODE: " + code);
    }, 5000);
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") console.log("Bot terhubung!");
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) startBot();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const isAdmin = sender === ADMIN;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    if (from.endsWith("@g.us") && text.includes("chat.whatsapp.com/")) {
      await sock.sendMessage(from, { delete: msg.key });
      await sock.sendMessage(from, { text: "⚠️ Dilarang kirim link grup!" });
      return;
    }

    if (!isAdmin) return;

    if (text === ".kick") {
      const target = msg.message.extendedTextMessage?.contextInfo?.participant;
      if (!target) return sock.sendMessage(from, { text: "Reply pesan member!" });
      await sock.groupParticipantsUpdate(from, [target], "remove");
      await sock.sendMessage(from, { text: "✅ Member di kick!" });
    }

    if (text === ".tagall") {
      const meta = await sock.groupMetadata(from);
      const members = meta.participants.map(p => p.id);
      const teks = members.map(m => "@" + m.split("@")[0]).join("\n");
      await sock.sendMessage(from, { text: teks, mentions: members });
    }

    if (text === ".info") {
      await sock.sendMessage(from, { text: "🤖 Bot WA\n\n.kick - Kick member\n.tagall - Tag semua\n.info - Info" });
    }
  });
}

startBot();

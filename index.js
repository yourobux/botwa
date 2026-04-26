const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");

const NOMOR_WA = "6285770538628";
const ADMIN_NUMBER = "6285770538628@s.whatsapp.net"; // nomor admin

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    browser: ["Bot", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("Bot terhubung!");
    }

    if (connection === "connecting") {
      if (!sock.authState.creds.registered) {
        await new Promise(r => setTimeout(r, 60000));
        try {
          const code = await sock.requestPairingCode(NOMOR_WA);
          console.log("=================================");
          console.log("PAIRING CODE KAMU:", code);
          console.log("=================================");
        } catch (e) {
          console.log("Gagal dapat pairing code:", e.message);
        }
      }
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startBot();
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const isAdmin = sender === ADMIN_NUMBER;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text || "";

    // Auto hapus link grup (semua orang)
    if (from.endsWith("@g.us") && text.includes("chat.whatsapp.com/")) {
      await sock.sendMessage(from, { delete: msg.key });
      await sock.sendMessage(from, { text: "⚠️ Link grup dilarang!" });
      return;
    }

    // Command khusus admin saja
    if (!isAdmin) return;

    // Command .kick
    if (text === ".kick") {
      const quoted = msg.message.extendedTextMessage?.contextInfo?.participant;
      if (!quoted) return sock.sendMessage(from, { text: "Tag/reply member yang mau di kick!" });
      await sock.groupParticipantsUpdate(fro

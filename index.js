const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");
const qrcode = require("qrcode-terminal");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log("Scan QR pakai WhatsApp!");
    }
    if (connection === "open") {
      console.log("Bot terhubung!");
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
    if (!from.endsWith("@g.us")) return;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text || "";
    if (text.includes("chat.whatsapp.com/")) {
      await sock.sendMessage(from, { delete: msg.key });
      await sock.sendMessage(from, { text: "⚠️ Link grup dilarang!" });
    }
  });
}

startBot();

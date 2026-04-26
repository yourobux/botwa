const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const ADMIN = "6285770538628@c.us";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { args: ["--no-sandbox"] }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan QR di atas!");
});

client.on("ready", () => {
  console.log("Bot terhubung!");
});

client.on("message", async (msg) => {
  const from = msg.from;
  const isGroup = from.endsWith("@g.us");
  const isAdmin = msg.author === ADMIN || from === ADMIN;
  const text = msg.body;

  if (isGroup && text.includes("chat.whatsapp.com/")) {
    await msg.delete(true);
    await client.sendMessage(from, "⚠️ Dilarang kirim link grup!");
    return;
  }

  if (!isAdmin) return;

  if (text === ".kick") {
    const quoted = await msg.getQuotedMessage();
    if (!quoted) return client.sendMessage(from, "Reply pesan member!");
    const chat = await msg.getChat();
    await chat.removeParticipants([quoted.author]);
    await client.sendMessage(from, "✅ Member di kick!");
  }

  if (text === ".tagall") {
    const chat = await msg.getChat();
    const members = chat.participants.map(p => p.id._serialized);
    const teks = members.map(m => "@" + m.split("@")[0]).join("\n");
    await client.sendMessage(from, teks, { mentions: members });
  }

  if (text === ".info") {
    await client.sendMessage(from, "🤖 Bot WA\n\n.kick - Kick member\n.tagall - Tag semua\n.info - Info");
  }
});

client.initialize();

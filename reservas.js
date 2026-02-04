const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ================= CONFIG =================
const CANAL_RESERVAS_ID = "1464793823719985172";

// ================= READY =================
client.once(Events.ClientReady, async () => {
  console.log(`☕🎀 Uwu Café (Reservas) activo como ${client.user.tag}`);

  const canal = await client.channels.fetch(CANAL_RESERVAS_ID);

  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  const embed = new EmbedBuilder()
    .setTitle("💌 Reservas — Uwu Café ☕🎀")
    .setColor(0xF6A5C0)
    .setDescription(
      "¿Quieres reservar una mesa o el local completo? ✨\n" +
      "Celebra con nosotros cumpleaños, citas o eventos especiales 🧁💕\n\n" +
      "**Reacciona con 💌 y agenda tu reserva 💖**\n" +
      "Nuestro personal te atenderá lo antes posible 🧸"
    )
    .setFooter({ text: "Uwu Café 🌸" });

  await canal.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);

const { EmbedBuilder } = require("discord.js");

const CANAL_RESERVAS_ID = "1464793823719985172";

module.exports = async (client) => {
  try {
    const canal = await client.channels.fetch(CANAL_RESERVAS_ID);
    if (!canal) return;

    const mensajes = await canal.messages.fetch({ limit: 10 });
    if (mensajes.some(m => m.author.id === client.user.id)) return;

    const embed = new EmbedBuilder()
      .setColor(0xF6A5C0)
      .setTitle("💌 Reservas — Uwu Café ☕🎀")
      .setDescription(
      "¿Quieres reservar una mesa o el local completo? ✨\n" +
      "Celebra con nosotros cumpleaños, citas o eventos especiales 🧁💕\n\n" +
      "**Reacciona con 💌 y agenda tu reserva 💗**\n" +
      "Nuestro staff te atenderá lo antes posible 🧸"
      )
      .setFooter({ text: "Uwu Café 🌸" });

    await canal.send({ embeds: [embed] });

  } catch (error) {
    console.error("❌ Error en reservas:", error);
  }
};


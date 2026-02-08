const { EmbedBuilder } = require("discord.js");

module.exports = {
  async enviarMenu(client) {
    const CANAL_MENU_ID = "ID_DEL_CANAL_MENU"; // CAMBIA ESTE ID

    const canal = await client.channels.fetch(CANAL_MENU_ID);
    if (!canal) return;

    // Evitar duplicar mensaje
    const mensajes = await canal.messages.fetch({ limit: 10 });
    if (mensajes.some(m => m.author.id === client.user.id)) return;

    const separador = "────────── ✧ ──────────";

    const embed = new EmbedBuilder()
      .setTitle("🍓✨ MENÚ & COMBOS — UWU CAFÉ ✨🍓")
      .setColor(0xF6A5C0)
      .setDescription(
        "\n\n" + // ✨ aire entre título y contenido

        `${separador}\n` +
        "🌸 **COMBOS SIN ALCOHOL** 🌸\n" +
        `${separador}\n\n` +

        "**☀️ Combo «Morning Uwu»**\n" +
        "☕ Uwu Café x3\n" +
        "🍪 Uwu Galleta x3\n\n" +

        "**🍩 Combo «Sweet Break»**\n" +
        "☕ Uwu Café x6\n" +
        "🍪 Uwu Galleta x3\n" +
        "🍩 Dona x3\n\n" +

        "**🌿 Combo «Uwu Street»**\n" +
        "🥙 Kebab x3\n" +
        "🍋 Limonada x3\n\n" +

        `${separador}\n` +
        "🌙 **COMBOS CON ALCOHOL** 🌙\n" +
        `${separador}\n\n` +

        "**🌸 Combo «Sakura Chill»**\n" +
        "🍶 Sake x3\n" +
        "🥙 Kebab x3\n\n" +

        "**🔥 Combo «Uwu Night Deluxe»**\n" +
        "🍶 Sake x3\n" +
        "🥙 Kebab x3\n" +
        "🍩 Dona x3\n" +
        "☕ Uwu Café x3 **o** x6 *(sin limonada)*\n" +
        "🍋 Limonada x3 **o** x6 *(sin uwu café)*\n\n" +

        `${separador}`
      )
      .setFooter({ text: "Uwu Café ☕🎀" });

    await canal.send({ embeds: [embed] });
  }
};

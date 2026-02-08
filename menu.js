const { EmbedBuilder } = require("discord.js");

module.exports = {
  async enviarMenu(client) {
    const CANAL_MENU_ID = "1464801507345039463"; // CAMBIA ESTE ID

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

        "**☀️ Combo «Morning Uwu» = 180 dls**\n" +
        " •  ☕ Uwu Café x3\n" +
        " •  🍪 Uwu Galleta x3\n\n" +

        "**🍩 Combo «Sweet Break» = 360 dls**\n" +
        " •  ☕ Uwu Café x6\n" +
        " •  🍪 Uwu Galleta x3\n" +
        " •  🍩 Dona x3\n\n" +

        "**🌿 Combo «Uwu Street» = 180 dls**\n" +
        " •  🥙 Kebab x3\n" +
        " •  🍋 Limonada x3\n\n" +

        `${separador}\n` +
        "🌙 **COMBOS CON ALCOHOL** 🌙\n" +
        `${separador}\n\n` +

        "**🌸 Combo «Sakura Chill» = 360 dls**\n" +
        " •  🍶 Sake x3\n" +
        " •  🥙 Kebab x3\n\n" +

        "**🔥 Combo «Uwu Night Deluxe» = 630 dls**\n" +
        " •  🍶 Sake x3\n" +
        " •  🥙 Kebab x3\n" +
        " •  🍩 Dona x3\n" +
        " •  ☕ Uwu Café x3 **o** x6 *(sin limonada)*\n" +
        " •  🍋 Limonada x3 **o** x6 *(sin uwu café)*\n\n" +

        `${separador}\n`

      )
      .setFooter({ text: "Uwu Café ☕🎀" });

    await canal.send({ embeds: [embed] });
  }
};

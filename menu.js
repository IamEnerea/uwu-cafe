const { EmbedBuilder } = require("discord.js");

module.exports = {
  async enviarMenu(client) {
    const CANAL_MENU_ID = "1464801507345039463";

    const canal = await client.channels.fetch(CANAL_MENU_ID);
    if (!canal) return;

    const mensajes = await canal.messages.fetch({ limit: 20 });
    const separador = "────────── ✧ ──────────";

    // ================= MENÚ PRINCIPAL =================
    if (!mensajes.some(m => m.embeds[0]?.title?.includes("MENÚ & COMBOS"))) {

      const menuEmbed = new EmbedBuilder()
        .setTitle("🍓✨ MENÚ & COMBOS — UWU CAFÉ ✨🍓")
        .setColor(0xF6A5C0)
        .setDescription(
          "\n\n" +

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

      await canal.send({ embeds: [menuEmbed] });
    }

    // ================= PRODUCTOS INDIVIDUALES =================
    if (!mensajes.some(m => m.embeds[0]?.title?.includes("PRODUCTOS INDIVIDUALES"))) {

      const individualesEmbed = new EmbedBuilder()
        .setTitle("🍓✨ PRODUCTOS INDIVIDUALES — UWU CAFÉ ✨🍓")
        .setColor(0xF6A5C0)
        .setDescription(
          "\n\n" +

          `${separador}\n` +
          "🌸 **PRODUCTOS DE CAFETERÍA** 🌸\n" +
          `${separador}\n\n` +

          "🍪 Galleta = 30 dls\n" +
          "🥙 Kebab = 60 dls\n" +
          "🍩 Dona = 30 dls\n\n" +

          "🍶 Sake = 60 dls\n" +
          "☕ Uwu Café = 30 dls\n" +
          "🍋 Limonada = 30 dls\n\n" +

          `${separador}\n` +
          "🛠 **PRODUCTOS ADICIONALES** 🛠\n" +
          `${separador}\n\n` +

          "🛠 Kit de reparación = 350 dls\n" +
          "🛹 Skateboard = 2000 dls\n" +
          "🎟 Rascas y gana = 250 dls\n\n" +

          `${separador}\n`
        )
        .setFooter({ text: "Uwu Café ☕🎀" });

      await canal.send({ embeds: [individualesEmbed] });
    }

    // ================= REPAIR WORKSHOP 10% =================
    if (!mensajes.some(m => m.embeds[0]?.title?.includes("REPAIR WORKSHOP"))) {

      const repairEmbed = new EmbedBuilder()
        .setTitle("🔧✨ CONVENIO — REPAIR WORKSHOP (10%) ✨🔧")
        .setColor(0x57F287)
        .setDescription(
          "\n\n" +
          "⚠️ *Válido únicamente presentando carnet laboral del taller.*\n\n" +

          `${separador}\n` +
          "🌸 **COMBOS SIN ALCOHOL** 🌸\n" +
          `${separador}\n\n` +

          "**☀️ Combo «Morning Uwu» = 162 dls**\n\n" +
          "**🍩 Combo «Sweet Break» = 324 dls**\n\n" +
          "**🌿 Combo «Uwu Street» = 162 dls**\n\n" +

          `${separador}\n` +
          "🌙 **COMBOS CON ALCOHOL** 🌙\n" +
          `${separador}\n\n` +

          "**🌸 Combo «Sakura Chill» = 324 dls**\n\n" +
          "**🔥 Combo «Uwu Night Deluxe» = 567 dls**\n\n" +

          `${separador}\n`
        )
        .setFooter({ text: "UwU Café • Convenio oficial activo" });

      await canal.send({ embeds: [repairEmbed] });
    }

    // ================= EJE 4 20% =================
    if (!mensajes.some(m => m.embeds[0]?.title?.includes("EJE 4"))) {

      const eje4Embed = new EmbedBuilder()
        .setTitle("🛠✨ CONVENIO — PALETO BAY EJE 4 (20%) ✨🛠")
        .setColor(0x3498DB)
        .setDescription(
          "\n\n" +
          "⚠️ *Válido únicamente presentando carnet laboral del taller.*\n\n" +

          `${separador}\n` +
          "🌸 **COMBOS SIN ALCOHOL** 🌸\n" +
          `${separador}\n\n` +

          "**☀️ Combo «Morning Uwu» = 144 dls**\n\n" +
          "**🍩 Combo «Sweet Break» = 288 dls**\n\n" +
          "**🌿 Combo «Uwu Street» = 144 dls**\n\n" +

          `${separador}\n` +
          "🌙 **COMBOS CON ALCOHOL** 🌙\n" +
          `${separador}\n\n` +

          "**🌸 Combo «Sakura Chill» = 288 dls**\n\n" +
          "**🔥 Combo «Uwu Night Deluxe» = 504 dls**\n\n" +

          `${separador}\n`
        )
        .setFooter({ text: "UwU Café • Convenio oficial activo" });

      await canal.send({ embeds: [eje4Embed] });
    }
  }
};

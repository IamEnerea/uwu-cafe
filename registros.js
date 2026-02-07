const { EmbedBuilder } = require("discord.js");

// ================= CONFIG =================
const CANAL_AUSENCIAS_ID = "1464803316482703563";
const CANAL_VETADOS_ID = "1464803485751967766";

async function enviarRegistros(client) {
  // ===== AUSENCIAS =====
  const canalAusencias = await client.channels.fetch(CANAL_AUSENCIAS_ID);
  if (canalAusencias) {
    const mensajes = await canalAusencias.messages.fetch({ limit: 10 });
    if (!mensajes.some(m => m.author.id === client.user.id)) {
      const embedAusencias = new EmbedBuilder()
        .setTitle("💤 AUSENCIAS — Uwu Café ☕🎀")
        .setColor(0xF6A5C0)
        .setDescription(
          "────────── ✧ ──────────\n\n" +
          "🧸 Este canal se utiliza para registrar las ausencias del personal del\n" +
          "**Uwu Café** de forma ordenada y clara ✨\n\n" +
          "────────── ✧ ──────────\n\n" +
          "👤 **Empleado:**\n" +
          "📝 **Razón IC:**\n" +
          "⏳ **Tiempo estimado de ausencia:**\n\n" +
          "────────── ✧ ──────────\n\n" +
          "💖 Gracias por avisar con anticipación."
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await canalAusencias.send({ embeds: [embedAusencias] });
    }
  }

  // ===== VETADOS =====
  const canalVetados = await client.channels.fetch(CANAL_VETADOS_ID);
  if (canalVetados) {
    const mensajes = await canalVetados.messages.fetch({ limit: 10 });
    if (!mensajes.some(m => m.author.id === client.user.id)) {
      const embedVetados = new EmbedBuilder()
        .setTitle("🚫 VETADOS — Uwu Café ☕🎀")
        .setColor(0xF6A5C0)
        .setDescription(
          "────────── ✧ ──────────\n\n" +
          "Este canal es para registrar a personas con **prohibición de ingreso**\n" +
          "al local y de consumo de productos de **Uwu Café** ☕🎀\n\n" +
          "────────── ✧ ──────────\n\n" +
          "👤 **Nombre / Apodo:**\n" +
          "📛 **Motivo del veto:**\n" +
          "🧑 **Empleado que reporta:**\n" +
          "📸 **Foto / Evidencia:** (si aplica)\n\n" +
          "────────── ✧ ──────────\n\n" +
          "🛑 Registro interno del local."
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await canalVetados.send({ embeds: [embedVetados] });
    }
  }
}

module.exports = { enviarRegistros };

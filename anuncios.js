const { EmbedBuilder } = require("discord.js");

const CANAL_ANUNCIOS_ID = "1469074594806759657"; // CAMBIA SI ES OTRO CANAL

async function enviarMensaje(client) {
  const canal = await client.channels.fetch(CANAL_ANUNCIOS_ID);
  if (!canal) return;

  // Evitar duplicados
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  const embed = new EmbedBuilder()
    .setTitle("☕🎀 Anuncios IN-GAME — Uwu Café 🎀☕")
    .setColor(0xF6A5C0)
    .setDescription(
      "✨ **Uso de anuncios IN-GAME** ✨\n\n" +
      "Estos mensajes están pensados para ser copiados y pegados dentro del juego usando el comando **/anuncio** cuando estés en servicio.\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🌸 **APERTURA DEL LOCAL**\n\n" +
      "/anuncio ☕🎀 Uwu Café ya abrió sus puertas ✨ ven por un cafecito calentito y un momento cozy 💖\n" +
      "/anuncio 🌸 El aroma a café ya se siente… Uwu Café está abierto ☕🧸\n" +
      "/anuncio ✨ Buscando un lugar tranquilo y bonito para relajarte? Uwu Café ya está atendiendo ☕🎀\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🧁 **COMIDA · CAFÉ**\n\n" +
      "/anuncio ☕🧁 Cafecito recién hecho y algo dulce ✨ te esperamos en Uwu Café 🎀\n" +
      "/anuncio 💖 Un café y un ambiente tranquilo? Todo eso te espera en Uwu Café ☕🌸\n" +
      "/anuncio 🧸✨ El lugar perfecto para una pausa tranquila existe… y es Uwu Café ☕🎀\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🎀 **AMBIENTE & VIBES**\n\n" +
      "/anuncio 🌸 Un espacio bonito y acogedor ☕🎀 ven a Uwu Café\n" +
      "/anuncio ✨ Música suave y café calentito 🧸☕ Uwu Café abierto\n" +
      "/anuncio 💕 Un lugar tranquilo para desconectar un rato ☕🎀\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🌙 **CIERRE DEL LOCAL**\n\n" +
      "/anuncio 🌙 Uwu Café cierra por hoy ☕🎀 gracias por acompañarnos ✨\n" +
      "/anuncio 🧸💖 El cafecito se despide por hoy… mañana volvemos ☕🌸\n" +
      "/anuncio ✨ Gracias por visitarnos ☕🎀 Uwu Café cerrado por hoy\n\n" +

      "────────── ✧ ──────────\n\n" +

      "💡 **Recordatorio**\n" +
      "• Usar estos anuncios solo cuando estés en servicio\n" +
      "• Puedes proponer nuevas ideas de anuncios en este mismo canal\n\n" +
      "**Gracias por formar parte de Uwu Café ☕🎀**"
     )
  .setFooter({ text: "Uwu Café 🌸" });

  await canal.send({ embeds: [embed] });
}

module.exports = { enviarMensaje };

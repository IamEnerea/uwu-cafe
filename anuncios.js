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
      "ㅤ\n" +
      "✨ **Uso de anuncios** ✨\n\n" +
      "Estos mensajes están pensados para ser copiados y pegados usando el comando **/anuncio** cuando estés en servicio.\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🌸 **APERTURA DEL LOCAL**\n\n" +
      "/anuncio ☕🎀 Uwu Café ya abrió sus puertas ✨ ven por un cafecito calentito 💖\n" +
      "/anuncio 🌸 El aroma a café ya se siente… Uwu Café está abierto ☕🧸\n" +
      "/anuncio ✨ Buscando un lugar tranquilo y bonito para relajarte? Uwu Café ya está atendiendo ☕🎀\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🎁 **COMBOS SIN ALCOHOL**\n\n" +
      "/anuncio ☀️🎀 Combo «Morning Uwu» disponible ✨ cafecito y galletitas para empezar bonito 💖\n" +
      "/anuncio 🍩🌸 Antojito dulce? Pide el combo «Sugar Uwu» ✨ café y donitas perfectas 🎀\n" +
      "/anuncio 🌿✨ Hambre callejera? Combo «Uwu Street» listo para ti 🥙🍋\n" +
      "/anuncio 🌸💖 ¿Pausa completa? Pide el combo «Sweet Break» ✨ el favorito para compartir 🎀\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🍷 **COMBOS CON ALCOHOL**\n\n" +
      "/anuncio 🔥✨ El combo «Uwu Deluxe Supreme» ya está disponible 🌙🍶 una experiencia completa 🎀\n" +
      "/anuncio 🌙🎀 ¿Noche especial? Pregunta por el «Uwu Deluxe Supreme» ✨\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🛠️ **PRODUCTOS DISPONIBLES**\n" +
      "🚑 **IFAKS (Antiestrés)**\n\n" +
      "/anuncio 🚑✨ IFAKS disponibles 💖 ven y desestrésate con nosotros\n" + 
      "/anuncio 🩺🌸 Mantén la calma en cualquier situación ✨ pregunta por nuestros IFAKS 🎀\n" +
      "/anuncio 💕🚑 Seguridad y apoyo listos para acompañarte ✨ stock disponible de IFAKS\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🔧 **KITS DE REPARACIÓN**\n\n" +
      "/anuncio 🔧✨ Kits de reparación disponibles 💼 mejora tu vehículo con nosotros\n" +
      "/anuncio 🛠️🌸 ¿Tu coche necesita mantenimiento? Tenemos kits listos ✨\n" +
      "/anuncio 💖🔧 Calidad y buen servicio en kits de reparación ven por el tuyo ✨\n\n" +

      "────────── ✧ ──────────\n\n" +

      "🛹 **SKATES**\n\n" +
      "/anuncio 🛹✨ Skates disponibles 💖 movilidad con estilo, ven por el tuyo\n" +
      "/anuncio 🌸🛹 ¿Buscas algo diferente? Tenemos skates en venta ✨\n" +
      "/anuncio 💕🛹 Listos para rodar ✨ pasa por el local y consigue tu Skateboard\n\n" +
      
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

      "💡 **Recordatorio**\n\n" +
      "• Usar estos anuncios solo cuando estés en servicio\n" +
      "• Puedes proponer nuevas ideas de anuncios en este mismo canal\n\n" +

      "────────── ✧ ──────────\n\n" +
      
      "**Gracias por formar parte de Uwu Café ☕🎀**"
     )
  .setFooter({ text: "Uwu Café 🌸" });

  await canal.send({ embeds: [embed] });
}

module.exports = { enviarMensaje };

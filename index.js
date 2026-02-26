const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ================= CONFIG =================
const CANAL_NORMATIVA_ID = "1464800212202815622";

// ================= READY =================
client.once(Events.ClientReady, async () => {
  console.log(`☕🎀 Uwu Café está online como ${client.user.tag}`);

  // ================= MENSAJES PRINCIPALES =================
  try {
    const reservas = require("./reservas");
    const convenios = require("./convenios");
    const postulaciones = require("./postulaciones");

    await reservas.enviarMensajePrincipal(client);
    await convenios.enviarMensajePrincipal(client);
    await postulaciones.enviarMensajePrincipal(client);
  } catch (error) {
    console.error("Error cargando los módulos:", error);
  }

  // ================= ANUNCIOS IN-GAME =================
  try {
    const anuncios = require("./anuncios");
    await anuncios.enviarMensaje(client);
  } catch (error) {
    console.error("Error enviando anuncios:", error);
  }

  // ================= MENU & COMBOS =================
  try {
    const menu = require("./menu");
    await menu.enviarMenu(client);
  } catch (error) {
    console.error("Error enviando el menú:", error);
  }

  // ================= REGISTROS INTERNOS =================
  try {
    const registros = require("./registros");
    await registros.enviarRegistros(client);
  } catch (error) {
    console.error("Error enviando registros:", error);
  }

  // ================= NORMATIVA =================
  try {
    const canal = await client.channels.fetch(CANAL_NORMATIVA_ID);
    if (!canal) return;

    // Evitar duplicar normativa
    const mensajes = await canal.messages.fetch({ limit: 10 });
    if (mensajes.some(m => m.author.id === client.user.id)) return;

    const embed = new EmbedBuilder()
      .setTitle("📜 NORMATIVA — Uwu Café ☕🎀")
      .setColor(0xF6A5C0)
      .setDescription(
        "ㅤ\n" +
        "✨ **Por favor, lee atentamente esta normativa antes de entrar en servicio.**\n" +
        "El cumplimiento de estas normas es obligatorio para todo el personal.\n\n" +

        "**🕒 Horarios y Servicio**\n" +
        "• Todo empleado **DEBE** iniciar y finalizar su turno en el apartado de **Fichaje**.\n" +
        "• Al iniciar servicio es obligatorio usar **/anuncio** indicando que el local está abierto.\n" +
        "• Durante el servicio, se debe anunciar menú, promociones o disponibilidad **cada 30 minutos**.\n\n" +

        "**📈 Ascensos y Desempeño**\n" +
        "• Los ascensos dependen de actitud, compromiso, horas trabajadas.\n" +
        "• Está prohibido insistir o presionar a jefatura para obtener un ascenso.\n\n" +

        "**💰 Cobros y Consumo**\n" +
        "• Todo producto **DEBE SER COBRADO**, sin excepciones ni amiguismo.\n" +
        "• Mientras estés de servicio, **no pagarás** lo que consumas.\n\n" +

        "**🤝 Conducta y Respeto**\n" +
        "• Se exige respeto absoluto entre compañeros y hacia los clientes.\n" +
        "• Faltas de respeto, discusiones o problemas personales durante el servicio serán sancionados.\n\n" +

        "**👕 Imagen y Recursos**\n" +
        "• El uniforme es obligatorio mientras estés de servicio.\n" +
        "• Los recursos del local son solo para actividades laborales.\n\n" +

        "**📆 Ausencias y Renuncias**\n" +
        "• Ausencias mayores a **5 días** deben ser notificadas a jefatura.\n" +
        "• Para renunciar, se debe hablar directamente con jefatura de forma respetuosa.\n\n" +

        "**Gracias por formar parte de Uwu Café. ☕🎀**\n"
      )
      .setFooter({ text: "Uwu Café 🌸" })
      .setImage("https://media.discordapp.net/attachments/1468089843643842640/1468089919090987079/hq720.jpg");

    await canal.send({ embeds: [embed] });
  } catch (error) {
    console.error("Error enviando la normativa:", error);
  }
});

// ================= INTERACCIONES =================
require("./interactions")(client);

// ================= MANEJO GLOBAL DE ERRORES =================
process.on("unhandledRejection", async (error) => {
  console.error("⚠️ Error no manejado:", error);

  // Evitar reinicio por interacción ya respondida
  if (error.code === 40060 || error.code === "InteractionAlreadyReplied") {
    console.log("⚡ Interacción ya respondida, se ignora.");
    return;
  }

  // Ignorar errores de tipo inválido en permisos
  if (error.code === "InvalidType") {
    console.log("⚡ Parámetro inválido para permisos, se ignora.");
    return;
  }
});

// ================= LOGIN =================
client.login(process.env.TOKEN);

// ================= SERVIDOR PARA FLY.IO =================
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Uwu Café está vivo ☕🎀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor web activo en puerto ${PORT}`);
});

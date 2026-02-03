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
const CANAL_NORMATIVA_ID = "1222628538440617984";

// ================= READY =================
client.once(Events.ClientReady, async () => {
  console.log(`☕🎀 Uwu Café está online como ${client.user.tag}`);

  const canal = await client.channels.fetch(CANAL_NORMATIVA_ID);

  // Evitar duplicar normativa
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  const embed = new EmbedBuilder()
    .setTitle("📜 Normativa Oficial — Uwu Café ☕🎀")
    .setColor(0xF6A5C0)
    .setDescription(
      "✨ **Por favor, lee atentamente esta normativa antes de entrar en servicio.**\n" +
      "El cumplimiento de estas normas es obligatorio para todo el personal.\n\n" +

      "**🕒 Horarios y Servicio**\n" +
      "• Todo empleado **DEBE** iniciar y finalizar su turno utilizando el bot **Uwu Time**.\n" +
      "• No fichar correctamente puede afectar **ascensos, descensos o permanencia** en el local.\n" +
      "• Al iniciar servicio es obligatorio usar **/anuncio** indicando que el local está abierto.\n" +
      "• Durante el servicio, se debe anunciar menú, promociones o disponibilidad **cada 30 minutos**.\n\n" +

      "**📈 Ascensos y Desempeño**\n" +
      "• Los ascensos dependen de actitud, compromiso, horas trabajadas y buen rol.\n" +
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

      "💗 **Gracias por formar parte de Uwu Café.**\n" +
      "☕🎀"
    );

  await canal.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);

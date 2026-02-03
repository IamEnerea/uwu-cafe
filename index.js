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
const CANAL_NORMATIVA_ID = "1464800212202815622";

// ================= READY =================
client.once(Events.ClientReady, async () => {
  console.log(`☕🎀 Uwu Café está online como ${client.user.tag}`);

  const canal = await client.channels.fetch(CANAL_NORMATIVA_ID);

  // Evitar duplicar normativa
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  const embed = new EmbedBuilder()
    .setTitle("📜 Normativa — Uwu Café ☕🎀\n\n")
    .setColor(0xF6A5C0)
    .setDescription(
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

      "💗 **Gracias por formar parte de Uwu Café.**\n" +
      "☕🎀"
      
  .setFooter({ text: "Uwu Café 🌸" })
  .setImage("https://media.discordapp.net/attachments/1468089843643842640/1468089919090987079/hq720.jpg?ex=6982c0c8&is=69816f48&hm=fc93319efb718839e4ca05ddbff0264c76c14b6c5942692c4049e9329e409a27&=&format=webp");
    );

  await canal.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);

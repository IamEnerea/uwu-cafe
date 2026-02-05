const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");

// ================= CONFIGURACIÓN =================

// 💼 Canal donde se enviará el mensaje de postulaciones
const CANAL_POSTULACIONES_ID = "1464792107909906584";

// 📂 Categoría donde se crearán los tickets
const CATEGORIA_POSTULACIONES_ID = "1464810893895536640";

// 👥 Roles del staff (los mismos que reservas y convenios)
const STAFF_ROLE_IDS = [
  "1464790642134876243",
  "1464806004037390543"
];

// ================= FUNCIÓN PRINCIPAL =================

module.exports = async (client) => {
  const canal = await client.channels.fetch(CANAL_POSTULACIONES_ID);
  if (!canal) return;

  // Evitar duplicar el mensaje
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  // ===== EMBED DE POSTULACIONES =====
  const embed = new EmbedBuilder()
    .setTitle("Postulaciones ☕🎀")
    .setColor(0xF6A5C0)
    .setDescription(
      "────────── ✧ ──────────\n\n" +
      "**¿Te interesa formar parte del equipo de Uwu Café?** ✨\n\n" +
      "• Buscamos personas responsables, amables y con amor por el servicio 💖\n" +
      "• Presiona el botón de abajo para postularte 🧸\n" +
      "• Nuestro equipo revisará tu solicitud ☕🎀\n\n" +
      "────────── ✧ ──────────"
    )
    .setFooter({ text: "Uwu Café ☕🎀" });

  const botonAbrir = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("abrir_postulacion")
      .setLabel("Postula aquí 🎀")
      .setStyle(ButtonStyle.Primary)
  );

  await canal.send({
    embeds: [embed],
    components: [botonAbrir]
  });

  // ================= INTERACCIONES =================

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const guild = interaction.guild;

    // ===== ABRIR POSTULACIÓN =====
    if (interaction.customId === "abrir_postulacion") {

      // Verificar si ya tiene postulación abierta
      const existente = guild.channels.cache.find(c =>
        c.parentId === CATEGORIA_POSTULACIONES_ID &&
        c.topic === interaction.user.id
      );

      if (existente) {
        return interaction.reply({
          content: "Ya tienes una postulación abierta 💖",
          ephemeral: true
        });
      }

      // ===== NUMERACIÓN CONSECUTIVA =====
      const numero = String(
        guild.channels.cache.filter(c =>
          c.parentId === CATEGORIA_POSTULACIONES_ID &&
          c.name.startsWith("postulacion-")
        ).size + 1
      ).padStart(3, "0");

      const permisos = [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        }
      ];

      STAFF_ROLE_IDS.forEach(id => {
        permisos.push({
          id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        });
      });

      const ticket = await guild.channels.create({
        name: `postulacion-${numero}`,
        topic: interaction.user.id,
        type: ChannelType.GuildText,
        parent: CATEGORIA_POSTULACIONES_ID,
        permissionOverwrites: permisos
      });

      const embedTicket = new EmbedBuilder()
        .setTitle("Postulaciones ☕🎀")
        .setColor(0xF6A5C0)
        .setDescription(
          `Hola ${interaction.user} 🧸💖\n\n` +
          "Gracias por tu interés en formar parte de **Uwu Café** ☕🎀\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Por favor, completa la siguiente información:\n\n" +
          "👤 **Nombre completo**\n" +
          "🎂 **Edad**\n" +
          "📞 **Número de contacto**\n" +
          "⏰ **Disponibilidad horaria**\n" +
          "🧠 **Experiencia previa** (opcional)\n" +
          "💖 **¿Por qué deberíamos elegirte como parte del equipo?**\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Nuestro equipo revisará tu postulación y te contactaremos✨"
        );

      const botonCerrar = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("cerrar_postulacion")
          .setLabel("Cerrar postulación 🔒")
          .setStyle(ButtonStyle.Secondary)
      );

      await ticket.send({
        embeds: [embedTicket],
        components: [botonCerrar]
      });

      await interaction.reply({
        content: `💖 Tu postulación fue creada: ${ticket}`,
        ephemeral: true
      });
    }

    // ===== CERRAR POSTULACIÓN (SIN BORRAR) =====
    if (interaction.customId === "cerrar_postulacion") {
      const canal = interaction.channel;
      const numero = canal.name.split("-").pop();

      await canal.permissionOverwrites.edit(guild.id, {
        SendMessages: false
      });

      for (const id of STAFF_ROLE_IDS) {
        await canal.permissionOverwrites.edit(id, {
          SendMessages: false
        });
      }

      await canal.permissionOverwrites.edit(canal.topic, {
        SendMessages: false
      });

      await canal.setName(`cerrado-postulacion-${numero}`);

      const embedCerrado = new EmbedBuilder()
        .setTitle("🔒 Postulación cerrada")
        .setColor(0xF6A5C0)
        .setDescription(
          `La **Postulación #${numero}** ha sido cerrada 🧸💖\n\n` +
          "Gracias por tu interés en **Uwu Café** ☕🎀"
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await interaction.reply({ embeds: [embedCerrado] });
    }
  });
};

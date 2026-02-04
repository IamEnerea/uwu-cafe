const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");

// ================= CONFIGURACIÓN =================

// 💌 Canal donde se enviará el mensaje de reservas
const CANAL_RESERVAS_ID = "1464793823719985172";

// 📂 Categoría donde se crearán los tickets
const CATEGORIA_RESERVAS_ID = "1464810177491632289";

// 👥 Roles del staff (máx 2)
const STAFF_ROLE_IDS = [
  "1464790642134876243",
  "1464806004037390543"
];

// ================= FUNCIÓN PRINCIPAL =================

module.exports = async (client) => {
  const canal = await client.channels.fetch(CANAL_RESERVAS_ID);
  if (!canal) return;

  // Evitar duplicar el mensaje
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  // ===== EMBED BONITO DE RESERVAS =====
  const embed = new EmbedBuilder()
    .setTitle("💌 Reservas — Uwu Café ☕🎀")
    .setColor(0xF6A5C0)
    .setDescription(
      "────────── ✧ ──────────\n" +
      "¿Quieres reservar una mesa o el local completo? ✨\n" +
      "Celebra con nosotros cumpleaños, citas o eventos especiales 🧁💕\n\n" +
      "────────── ✧ ──────────\n\n" +
      "Reacciona presionando el botón de abajo y agenda tu reserva 💖\n\n" +
      "Nuestro personal te atenderá lo antes posible 🧸\n\n" +
      "────────── ✧ ──────────\n"
    )
    .setFooter({ text: "Uwu Café ☕🎀" });

  const botonAbrir = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("abrir_reserva")
      .setLabel("Reservar 💌")
      .setStyle(ButtonStyle.Primary)
  );

  await canal.send({
    embeds: [embed],
    components: [botonAbrir]
  });

  // ================= INTERACCIONES =================

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    // ===== ABRIR TICKET =====
    if (interaction.customId === "abrir_reserva") {
      const guild = interaction.guild;

      const existente = guild.channels.cache.find(c =>
        c.parentId === CATEGORIA_RESERVAS_ID &&
        c.name === `reserva-${interaction.user.id}`
      );

      if (existente) {
        return interaction.reply({
          content: "Ya tienes un ticket de reserva abierto. 💖",
          ephemeral: true
        });
      }

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
        name: `reserva-${interaction.user.id}`,
        type: ChannelType.GuildText,
        parent: CATEGORIA_RESERVAS_ID,
        permissionOverwrites: permisos
      });

      const embedTicket = new EmbedBuilder()
        .setColor(0xF6A5C0)
        .setTitle("💌 Reserva — Uwu Café ☕🎀")
        .setDescription(
          `Hola ${interaction.user} 🧸💗\n\n` +
          "Gracias por tu interés en **Uwu Café** ☕🎀\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Por favor, completa la siguiente información:\n\n" +
          "📅 **Fecha de la reserva**\n" +
          "⏰ **Hora**\n" +
          "🍽️ **Mesa o local completo**\n" +
          "👥 **Cantidad de personas**\n" +
          "🎉 **Tipo de evento** (si aplica)\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Nuestro equipo te atenderá lo antes posible ✨"
        );

      const botonCerrar = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("cerrar_reserva")
          .setLabel("Cerrar ticket 🔒")
          .setStyle(ButtonStyle.Secondary)
      );

      await ticket.send({
        embeds: [embedTicket],
        components: [botonCerrar]
      });

      await interaction.reply({
        content: `💖 Tu ticket fue creado: ${ticket}`,
        ephemeral: true
      });
    }

    // ===== CERRAR TICKET =====
    if (interaction.customId === "cerrar_reserva") {
      const canal = interaction.channel;
      const numero = canal.id.slice(-4);

      const embedCerrado = new EmbedBuilder()
        .setTitle("🔒 Reserva cerrada")
        .setColor(0xF6A5C0)
        .setDescription(
          `La **Reserva #${numero}** ha sido cerrada correctamente 🧸💗\n\n` +
          "Gracias por confiar en **Uwu Café** ☕🎀"
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await canal.send({ embeds: [embedCerrado] });

      setTimeout(() => canal.delete(), 5000);
    }
  });
};

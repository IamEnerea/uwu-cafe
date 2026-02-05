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

module.exports = {
  // ===== MÉTODO PARA ENVIAR MENSAJE PRINCIPAL =====
  async enviarMensajePrincipal(client) {
    const canal = await client.channels.fetch(CANAL_RESERVAS_ID);
    if (!canal) return;

    const mensajes = await canal.messages.fetch({ limit: 10 });
    if (mensajes.some(m => m.author.id === client.user.id)) return;

    const embed = new EmbedBuilder()
      .setTitle("Reservas ☕🎀")
      .setColor(0xF6A5C0)
      .setDescription(
        "────────── ✧ ──────────\n\n" +
        "**¿Quieres reservar una mesa o el local completo?** ✨\n\n" +
        "• Celebra con nosotros cumpleaños, citas o eventos especiales 🧁💕\n" +
        "• Reacciona presionando el botón de abajo y agenda tu reserva 💖\n" +
        "• Nuestro personal te atenderá lo antes posible 🧸\n\n" +
        "────────── ✧ ──────────\n"
      )
      .setFooter({ text: "Uwu Café ☕🎀" });

    const botonAbrir = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("abrir_reserva")
        .setLabel("Reserva aquí 💌")
        .setStyle(ButtonStyle.Primary)
    );

    await canal.send({ embeds: [embed], components: [botonAbrir] });
  },

  // ===== MÉTODO PARA ABRIR TICKET =====
  async abrir(interaction) {
    const guild = interaction.guild;
    await interaction.deferReply({ ephemeral: true });

    const existente = guild.channels.cache.find(c =>
      c.parentId === CATEGORIA_RESERVAS_ID &&
      c.topic === interaction.user.id
    );

    if (existente) {
      return interaction.editReply(
        "Ya tienes un ticket de reserva abierto. 💖"
      );
    }

    const numero = String(
      guild.channels.cache.filter(c =>
        c.parentId === CATEGORIA_RESERVAS_ID &&
        c.name.startsWith("reserva-")
      ).size + 1
    ).padStart(3, "0");

    const permisos = [
      { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
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
      name: `reserva-${numero}`,
      topic: interaction.user.id,
      type: ChannelType.GuildText,
      parent: CATEGORIA_RESERVAS_ID,
      permissionOverwrites: permisos
    });

    const embedTicket = new EmbedBuilder()
      .setColor(0xF6A5C0)
      .setTitle("Reservas ☕🎀")
      .setDescription(
        `Hola ${interaction.user} 🧸💖\n\n` +
        "Gracias por tu interés en **Uwu Café** ☕🎀\n\n" +
        "────────── ✧ ──────────\n\n" +
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

    await ticket.send({ embeds: [embedTicket], components: [botonCerrar] });

    await interaction.editReply(
      `💖 Tu ticket fue creado correctamente: ${ticket}`
    );
  },

  // ===== MÉTODO PARA CERRAR TICKET =====
  async cerrar(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const guild = interaction.guild;
    const canal = interaction.channel;
    const numero = canal.name.split("-").pop();

    await canal.permissionOverwrites.edit(guild.id, { SendMessages: false });
    for (const id of STAFF_ROLE_IDS) {
      await canal.permissionOverwrites.edit(id, { SendMessages: false });
    }
    await canal.permissionOverwrites.edit(canal.topic, { SendMessages: false });

    await canal.setName(`cerrado-reserva-${numero}`);

    const embedCerrado = new EmbedBuilder()
      .setTitle("🔒 Reserva cerrada")
      .setColor(0xF6A5C0)
      .setDescription(
        `La **Reserva #${numero}** ha sido cerrada correctamente 🧸💖\n\n` +
        "Gracias por confiar en **Uwu Café** ☕🎀"
      );

    await interaction.editReply({ embeds: [embedCerrado] });
  }
};

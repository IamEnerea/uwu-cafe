const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");

// ================= CONFIGURACIÓN =================

// 🤝 Canal donde se enviará el mensaje de convenios
const CANAL_CONVENIOS_ID = "1464794312163201276";

// 📂 Categoría donde se crearán los tickets
const CATEGORIA_CONVENIOS_ID = "1464810778724008139";

// 👥 Roles del staff (máx 2)
const STAFF_ROLE_IDS = [
  "1464790642134876243",
  "1464806004037390543"
];

// ================= FUNCIÓN PRINCIPAL =================

module.exports = async (client) => {
  const canal = await client.channels.fetch(CANAL_CONVENIOS_ID);
  if (!canal) return;

  // Evitar duplicar mensaje
  const mensajes = await canal.messages.fetch({ limit: 10 });
  if (mensajes.some(m => m.author.id === client.user.id)) return;

  // ===== EMBED CONVENIOS =====
  const embed = new EmbedBuilder()
    .setTitle("Convenios ☕🎀")
    .setColor(0xF6A5C0)
    .setDescription(
      "────────── ✧ ──────────\n\n" +
      "**¿Tienes un negocio o taller y deseas colaborar con nosotros?** ✨\n\n" +
      "• También realizamos **pedidos grandes** y **alianzas comerciales** 🧁💼\n" +
      "• Presiona el botón de abajo para abrir un ticket de convenio 💖\n" +
      "• Nuestro equipo se pondrá en contacto contigo 🧸\n\n" +
      "────────── ✧ ──────────"
    )
    .setFooter({ text: "Uwu Café ☕🎀" });

  const botonAbrir = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("abrir_convenio")
      .setLabel("Solicita tu convenio 🤝")
      .setStyle(ButtonStyle.Primary)
  );

  await canal.send({
    embeds: [embed],
    components: [botonAbrir]
  });

  // ================= INTERACCIONES =================

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    // ===== ABRIR CONVENIO =====
    if (interaction.customId === "abrir_convenio") {
      const guild = interaction.guild;

      const contador =
        guild.channels.cache.filter(c =>
          c.parentId === CATEGORIA_CONVENIOS_ID
        ).size + 1;

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
        name: `convenio-${contador}`,
        type: ChannelType.GuildText,
        parent: CATEGORIA_CONVENIOS_ID,
        permissionOverwrites: permisos
      });

      const embedTicket = new EmbedBuilder()
        .setColor(0xF6A5C0)
        .setTitle("Convenios ☕🎀")
        .setDescription(
          `Hola ${interaction.user} 🧸💖\n\n` +
          "Gracias por tu interés en colaborar con **Uwu Café** ☕🎀\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Por favor, indícanos:\n\n" +
          "🏢 **Nombre del negocio o taller:**\n" +
          "📦 **Tipo de convenio o pedido:**\n" +
          "📅 **Fecha estimada:**\n" +
          "📞 **Número de contacto:**\n" +
          "📝 **Detalles adicionales:**\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Nuestro equipo te responderá lo antes posible ✨"
        );

      const botonCerrar = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("cerrar_convenio")
          .setLabel("Cerrar convenio 🔒")
          .setStyle(ButtonStyle.Secondary)
      );

      await ticket.send({
        embeds: [embedTicket],
        components: [botonCerrar]
      });

      await interaction.reply({
        content: `💖 Tu ticket de convenio fue creado: ${ticket}`,
        ephemeral: true
      });
    }

    // ===== CERRAR CONVENIO =====
    if (interaction.customId === "cerrar_convenio") {
      const canal = interaction.channel;

      const embedCerrado = new EmbedBuilder()
        .setTitle("🔒 Convenio cerrado")
        .setColor(0xF6A5C0)
        .setDescription(
          "Este convenio ha sido marcado como **cerrado** 🧸💖\n\n" +
          "Gracias por tu interés en **Uwu Café** ☕🎀"
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await canal.send({ embeds: [embedCerrado] });

      await canal.permissionOverwrites.edit(canal.guild.id, {
        ViewChannel: false
      });
    }
  });
};

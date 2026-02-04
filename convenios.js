const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");

// ================= CONFIGURACIÓN =================

// 💼 Canal donde se enviará el mensaje de convenios
const CANAL_CONVENIOS_ID = "1464794312163201276";

// 📂 Categoría donde se crearán los tickets
const CATEGORIA_CONVENIOS_ID = "1464810778724008139";

// 👥 Roles del staff
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

  // ===== EMBED DE CONVENIOS =====
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
      .setLabel("Solicitar convenio 🤝")
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

    // ===== ABRIR CONVENIO =====
    if (interaction.customId === "abrir_convenio") {

      const existente = guild.channels.cache.find(c =>
        c.parentId === CATEGORIA_CONVENIOS_ID &&
        c.topic === interaction.user.id
      );

      if (existente) {
        return interaction.reply({
          content: "Ya tienes un convenio abierto 🤍",
          ephemeral: true
        });
      }

      // ===== NUMERACIÓN CONSECUTIVA =====
      const numero = String(
        guild.channels.cache.filter(c =>
          c.parentId === CATEGORIA_CONVENIOS_ID &&
          c.name.startsWith("convenio-")
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
        name: `convenio-${numero}`,
        topic: interaction.user.id,
        type: ChannelType.GuildText,
        parent: CATEGORIA_CONVENIOS_ID,
        permissionOverwrites: permisos
      });

      const embedTicket = new EmbedBuilder()
        .setTitle("Convenio 🤝☕")
        .setColor(0xF6A5C0)
        .setDescription(
          `Hola ${interaction.user} 🧸💖\n\n` +
          "Gracias por tu interés en colaborar con **Uwu Café** ☕🎀\n\n" +
          "────────── ✧ ──────────\n\n" +
          "Por favor, indícanos:\n\n" +
          "🏢 **Nombre del negocio o taller**\n" +
          "📦 **Tipo de convenio o pedido**\n" +
          "📅 **Fecha estimada**\n" +
          "📞 **Número de contacto**\n" +
          "📝 **Detalles adicionales**\n\n" +
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
        content: `💼 Tu convenio fue creado: ${ticket}`,
        ephemeral: true
      });
    }

    // ===== CERRAR CONVENIO (SIN BORRAR) =====
    if (interaction.customId === "cerrar_convenio") {
      const canal = interaction.channel;
      const numero = canal.name.split("-").pop();

      await canal.permissionOverwrites.edit(guild.id, { SendMessages: false });
      for (const id of STAFF_ROLE_IDS) {
        await canal.permissionOverwrites.edit(id, { SendMessages: false });
      }
      await canal.permissionOverwrites.edit(canal.topic, { SendMessages: false });

      await canal.setName(`cerrado-convenio-${numero}`);

      const embedCerrado = new EmbedBuilder()
        .setTitle("🔒 Convenio cerrado")
        .setColor(0xF6A5C0)
        .setDescription(
          `El **Convenio #${numero}** ha sido cerrado correctamente 🧸💖\n\n` +
          "Gracias por tu interés en **Uwu Café** ☕🎀"
        )
        .setFooter({ text: "Uwu Café 🌸" });

      await interaction.reply({ embeds: [embedCerrado] });
    }
  });
};

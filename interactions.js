const { Events } = require("discord.js");

const reservas = require("./reservas");
const convenios = require("./convenios");
const postulaciones = require("./postulaciones");

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    try {
      // ===== RESERVAS =====
      if (interaction.customId === "abrir_reserva") {
        return await reservas.abrir(interaction);
      }

      if (interaction.customId === "cerrar_reserva") {
        return await reservas.cerrar(interaction);
      }

      // ===== CONVENIOS =====
      if (interaction.customId === "abrir_convenio") {
        return await convenios.abrir(interaction);
      }

      if (interaction.customId === "cerrar_convenio") {
        return await convenios.cerrar(interaction);
      }

      // ===== POSTULACIONES =====
      if (interaction.customId === "abrir_postulacion") {
        return await postulaciones.abrir(interaction);
      }

      if (interaction.customId === "cerrar_postulacion") {
        return await postulaciones.cerrar(interaction);
      }

    } catch (error) {
      console.error("Error en interacción:", error);

      if (!interaction.replied) {
        await interaction.reply({
          content: "❌ Hubo un error al procesar el botón.",
          ephemeral: true
        });
      }
    }
  });
};

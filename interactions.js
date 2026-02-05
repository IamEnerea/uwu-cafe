const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {

    if (!interaction.isButton()) return;

    // ===== RESERVAS =====
    if (interaction.customId === "abrir_reserva") {
      const reservas = require("./reservas");
      return reservas.abrir(interaction);
    }

    if (interaction.customId === "cerrar_reserva") {
      const reservas = require("./reservas");
      return reservas.cerrar(interaction);
    }

    // ===== CONVENIOS =====
    if (interaction.customId === "abrir_convenio") {
      const convenios = require("./convenios");
      return convenios.abrir(interaction);
    }

    if (interaction.customId === "cerrar_convenio") {
      const convenios = require("./convenios");
      return convenios.cerrar(interaction);
    }

    // ===== POSTULACIONES =====
    if (interaction.customId === "abrir_postulacion") {
      const postulaciones = require("./postulaciones");
      return postulaciones.abrir(interaction);
    }

    if (interaction.customId === "cerrar_postulacion") {
      const postulaciones = require("./postulaciones");
      return postulaciones.cerrar(interaction);
    }
  });
};

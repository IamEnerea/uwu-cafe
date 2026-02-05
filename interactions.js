const { Events } = require("discord.js");

// 🔒 Requerimos los módulos UNA SOLA VEZ
const reservas = require("./reservas");
const convenios = require("./convenios");
const postulaciones = require("./postulaciones");

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    // ===== RESERVAS =====
    if (interaction.customId === "abrir_reserva") {
      return reservas.abrir(interaction);
    }

    if (interaction.customId === "cerrar_reserva") {
      return reservas.cerrar(interaction);
    }

    // ===== CONVENIOS =====
    if (interaction.customId === "abrir_convenio") {
      return convenios.abrir(interaction);
    }

    if (interaction.customId === "cerrar_convenio") {
      return convenios.cerrar(interaction);
    }

    // ===== POSTULACIONES =====
    if (interaction.customId === "abrir_postulacion") {
      return postulaciones.abrir(interaction);
    }

    if (interaction.customId === "cerrar_postulacion") {
      return postulaciones.cerrar(interaction);
    }
  });
};

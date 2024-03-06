const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies To Ping"),
  async execute(interaction) {
    if (!hasPermissions) {
      return;
    }
    await interaction.reply("Pong");
  },
};

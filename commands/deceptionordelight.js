const { SlashCommandBuilder } = require("discord.js");
const { updateUserData, getPrize } = require("../filing/updateuserdata.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deceptionordelight")
    .setDescription("You Either Perform A Task Or Get Reward Right Away"),
  async execute(interaction) {
    // Get the user who invoked the command
    const user = interaction.user;

    getPrize().then((data) => {
      updateUserData(user.id, data).then((data) => {
        const prizesList = data.prizesWon
          .map((prize, i) => `${i + 1}) ${prize}`)
          .join("\n");
        interaction.reply(
          `Hello, <@!${data.userId}>! You've Used This Command ${data.commandUsed} Times! And Have The Following Rewards\n${prizesList}`
        );
      });
    });
  },
};

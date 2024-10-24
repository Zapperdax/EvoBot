const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { updateUserData, getPrize } = require("../filing/updateuserdata.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deceptionordelight")
    .setDescription("You Either Perform A Task Or Get Reward Right Away"),
  async execute(interaction) {
    // Get the user who invoked the command
    const user = interaction.user;

    const prizeEmbed = new EmbedBuilder()
      .setTitle("Your Rewards And Quests")
      .setColor(0x24a5c5);

    getPrize().then((data) => {
      updateUserData(user.id, data).then((data) => {
        const prizesList = data.prizesWon
          .map((prize, i) => `**${i + 1})** ${prize}`)
          .join("\n");

        prizeEmbed.addFields(
          {
            name:
              data.commandUsed < 10
                ? `Time To Unravel Your Prize Or Embark On A Quest, **${user.username}**!`
                : `You've Received The Following Prizes`,
            value: prizesList || "No prizes yet", // In case prizesList is empty
          },
          {
            name:
              data.commandUsed < 10
                ? `Cooldown`
                : `Command Usage Limit Reached`,
            value:
              data.commandUsed < 10
                ? `You Can Use This Command Again In ${
                    data.commandUsedTime + 43200 - Math.floor(Date.now() / 1000)
                  } Seconds!`
                : `You've Reached The Maximum Number Of Times You Can Use The command!`,
          }
        );
        interaction.reply({ embeds: [prizeEmbed] });
      });
    });
  },
};

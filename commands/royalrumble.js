const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("royalrumble")
    .setDescription("Starts a Royal Rumble event"),

  async execute(interaction) {
    // Create an embed using EmbedBuilder
    const embed = new EmbedBuilder()
      .setTitle("Royal Rumble Event!")
      .setDescription("React to this message to join the Royal Rumble!")
      .setColor(0x24a5c5);

    // Send the embed and react to it
    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    const reactionEmoji = "🔥"; // Change this emoji to your preferred reaction
    await message.react(reactionEmoji);

    // Array to store users who react
    let participants = [];

    // Create a reaction collector
    const filter = (reaction, user) =>
      reaction.emoji.name === reactionEmoji && !user.bot;
    const collector = message.createReactionCollector({ filter, time: 10000 }); // Collect for 60 seconds

    collector.on("collect", (reaction, user) => {
      if (!participants.includes(user.id)) {
        participants.push(user.id); // Add user ID to participants array
        console.log(`${user.tag} joined the Royal Rumble!`);
      }
    });

    collector.on("end", (collected) => {
      console.log("Participants:", participants);
      interaction.followUp({
        content: `Royal Rumble participants: ${participants.map(
          (participant) => {
            return `<@!${participant}> `;
          }
        )}`,
      });
    });
  },
};

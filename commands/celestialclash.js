const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  battleTexts,
  reviveTexts,
  battleTitles,
} = require("../functions/data.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celestialclash")
    .setDescription("Starts a Royal Rumble event"),

  async execute(interaction) {
    // Create an embed using EmbedBuilder
    const embed = new EmbedBuilder()
      .setTitle("Celestial's Clash Event!")
      .setDescription(
        "Event Starting In 1 Minute\nReact To This Message To Join The Celestial's Clash Event!"
      )
      .setColor(0x24a5c5);

    // Send the embed and react to it
    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    const reactionEmoji = "🔥"; // Change this emoji to your preferred reaction
    await message.react(reactionEmoji);

    // Array to store users who react
    let participants = [
      "796707183332556830",
      "552678985859989506",
      "821036826915635201",
      "329101548397264896",
      "231432639196823552",
      "761651894304768010",
      "732550798084407296",
      "316149143078961152",
    ];
    // let participants = [];

    // Array of participants who lost
    let defeatedParticipants = [];

    // Amount of rounds
    let roundsCount = 1;

    // Create a reaction collector
    const filter = (reaction, user) =>
      reaction.emoji.name === reactionEmoji && !user.bot;
    const collector = message.createReactionCollector({ filter, time: 5000 }); // Collect for 60 seconds

    // Log "10 seconds remaining" when there are 10 seconds left
    // setTimeout(() => {
    //   // Create an embed using EmbedBuilder
    //   const five_seconds_embed = new EmbedBuilder()
    //     .setTitle("Join Before The Time Runs Out")
    //     .setDescription("10 Seconds Remaining!!!")
    //     .setColor(0x24a5c5);
    //   interaction.followUp({ embeds: [five_seconds_embed], fetchReply: true });
    // }, 50000); // 10 seconds delay (65000 - 50000 = 10000 ms)

    collector.on("collect", (reaction, user) => {
      if (!participants.includes(user.id)) {
        participants.push(user.id); // Add user ID to participants array
      }
    });

    collector.on("end", async (collected) => {
      // Handle case if no one joins
      if (participants.length < 2) {
        return interaction.followUp({
          content: "Not Enough Participants To Start The Clash!",
        });
      }
      // Create an embed for participants
      const participants_embed = new EmbedBuilder()
        .setTitle("Celestial's Clash Participants")
        .setDescription(
          participants.length > 0
            ? participants.map((participant) => `<@!${participant}>`).join("\n") // Display each participant on a new line
            : "No participants joined." // Handle case if no one joins
        )
        .setColor(0x24a5c5);

      // Send the embed as a follow-up message
      interaction.followUp({ embeds: [participants_embed] });

      // Continue the battle until only one participant is left
      while (participants.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 6500)); // 5 second delay between battles
        // Randomly select the first participant
        const firstIndex = Math.floor(Math.random() * participants.length);
        const firstParticipant = participants[firstIndex];

        // Remove the first participant from the array
        participants.splice(firstIndex, 1);

        // Randomly select the second participant from the remaining array
        const secondIndex = Math.floor(Math.random() * participants.length);
        const secondParticipant = participants[secondIndex];

        // Create an embed for the battle outcome
        const battle_embed = new EmbedBuilder()
          .setTitle(`Round ${roundsCount}`)
          .setColor(0x24a5c5);

        const update_embed = new EmbedBuilder()
          .setTitle("Status Of The Event!")
          .setColor(0x24a5c5);

        // Select a random battlePhrase
        const randomBattlePhraseIndex = Math.floor(
          Math.random() * battleTexts.length
        );

        const randomBattleReviveIndex = Math.floor(
          Math.random() * reviveTexts.length
        );

        const randomBattleTitleIndex = Math.floor(
          Math.random() * battleTitles.length
        );

        let battleText = battleTexts[randomBattlePhraseIndex].text;
        let reviveText = reviveTexts[randomBattleReviveIndex].text;

        // Perform replacements in separate steps for clarity
        let finalText = battleText
          .replace(/{player1}/g, `<@!${secondParticipant}>`)
          .replace(/{player2}/g, `<@!${firstParticipant}>`);

        // Construct the value field
        battle_embed.addFields({
          name: battleTitles[randomBattleTitleIndex],
          value: finalText,
        });

        // Add the defeated participant to the defeatedParticipants array
        defeatedParticipants.push(firstParticipant);

        if (Math.random() < 0.1 && defeatedParticipants.length > 0) {
          // Revive a random number of participants from the defeated participants array
          let reviveParticipantsLength = Math.floor(
            Math.random() * defeatedParticipants.length
          );

          // This is added because if the array is too large, it'll always be > 4
          // we cap the max revives to 4, but if the array is too large, it'll always be > 4
          // so we add more randomness, so it is in between 1-4
          if (reviveParticipantsLength > 4) {
            reviveParticipantsLength = Math.floor(Math.random() * 4);
          }

          for (let i = 0; i < reviveParticipantsLength; i++) {
            const reviveIndex = Math.floor(
              Math.random() * defeatedParticipants.length
            );
            const revivedParticipant = defeatedParticipants[reviveIndex];

            // Move the revive participant back to participants
            participants.push(revivedParticipant);

            // Remove the defeated participant from the defeatedParticipants array
            defeatedParticipants.splice(reviveIndex, 1);

            let reviveTextFinal = reviveText.replace(
              "{player1}",
              `<@!${revivedParticipant}>`
            );

            battle_embed.addFields({
              name: "Revival Of A Celestial",
              value: reviveTextFinal,
            });
          }
        }

        update_embed.addFields({
          name: `Round ${roundsCount}`,
          value: "Celestials Status",
        });

        update_embed.addFields({
          name: `Alive Celestials`,
          value:
            participants.length > 0
              ? participants
                  .map((participant) => `<@!${participant}>`)
                  .join("\n") // Display each participant on a new line
              : "None", // Handle case if no one joins
          inline: true,
        });

        update_embed.addFields({
          name: `Defeated Celestials`,
          value:
            defeatedParticipants.length > 0
              ? defeatedParticipants
                  .map((participant) => `<@!${participant}>`)
                  .join("\n") // Display each participant on a new line
              : "None", // Handle case if no one joins
          inline: true,
        });

        // Send the battle outcome as a follow-up message
        interaction.followUp({ embeds: [battle_embed] });

        await new Promise((resolve) => setTimeout(resolve, 6500)); // 5 second delay between battles
        interaction.followUp({ embeds: [update_embed] });

        roundsCount++;
      }

      // Once one participant is left, declare the winner
      if (participants.length === 1) {
        await new Promise((resolve) => setTimeout(resolve, 6500)); // 5 second delay between battles
        const winner = participants[0];
        const winner_embed = new EmbedBuilder()
          .setTitle("Winner!")
          .setDescription(
            `<@!${winner}> Is The Last Person Standing And Wins The Celestial's Clash!`
          )
          .setColor(0x00ff00);

        // Send the winner announcement
        interaction.followUp({ embeds: [winner_embed] });
      } else {
        // If no participants remain, display an appropriate message
        interaction.followUp({ content: "No participants remain!" });
      }
    });
  },
};

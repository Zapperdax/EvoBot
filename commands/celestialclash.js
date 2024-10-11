const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celestialclash")
    .setDescription("Starts a Royal Rumble event"),

  async execute(interaction) {
    // Create an embed using EmbedBuilder
    const embed = new EmbedBuilder()
      .setTitle("Celestial's Clash Event!")
      .setDescription(
        "React To This Message To Join The Celestial's Clash Event!"
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
    // let participants = [
    //   "796707183332556830",
    //   "552678985859989506",
    //   "821036826915635201",
    //   "329101548397264896",
    //   "231432639196823552",
    //   "761651894304768010",
    //   "732550798084407296",
    // ];
    let participants = [];

    // Array of participants who lost
    let defeatedParticipants = [];

    // Amount of rounds
    let roundsCount = 1;

    // Battle Texts
    let battleTexts = [
      {
        firstPhrase: "{player1} slipped on a banana peel,",
        middlePhrase: "accidentally tackling",
        lastPhrase: "{player2}, who never saw it coming!",
      },
      {
        firstPhrase: "In an epic pillow fight,",
        middlePhrase: "{player1} knocked out",
        lastPhrase: "{player2}, who was clearly not ready for bedtime!",
      },
      {
        firstPhrase: "{player1} threw a rubber chicken,",
        middlePhrase: "hitting",
        lastPhrase:
          "{player2} square in the face. It was surprisingly effective!",
      },
      {
        firstPhrase: "While dramatically twirling,",
        middlePhrase: "{player1} bumped into",
        lastPhrase: "{player2}, sending them flying into the snack table.",
      },
      {
        firstPhrase: "{player1} started a dance-off,",
        middlePhrase: "and",
        lastPhrase: "{player2} moonwalked right out of the competition!",
      },
      {
        firstPhrase: "In a fit of rage,",
        middlePhrase: "{player1} hurled a giant marshmallow at",
        lastPhrase: "{player2}, who is now stuck in a gooey mess!",
      },
      {
        firstPhrase: "{player1} summoned a herd of rubber ducks,",
        middlePhrase: "quacking relentlessly at",
        lastPhrase: "{player2}, who fled from the cuteness overload.",
      },
      {
        firstPhrase: "{player1} accidentally hit the self-destruct button,",
        middlePhrase: "blasting",
        lastPhrase: "{player2} into a pile of confetti!",
      },
      {
        firstPhrase: "Armed with nothing but a squeaky toy,",
        middlePhrase: "{player1} scared off",
        lastPhrase: "{player2}, who could not handle the noise!",
      },
      {
        firstPhrase: "{player1} performed a dramatic hair flip,",
        middlePhrase: "blinding",
        lastPhrase: "{player2} with their fabulousness.",
      },
      {
        firstPhrase: "{player1} challenged",
        middlePhrase: "{player2} to a rock-paper-scissors match,",
        lastPhrase: "and rock never loses to scissors!",
      },
      {
        firstPhrase: "{player1} unleashed the ultimate tickle attack,",
        middlePhrase: "leaving",
        lastPhrase: "{player2} laughing so hard they had to quit!",
      },
      {
        firstPhrase: "{player1} threw a pie in the face of",
        middlePhrase: "{player2},",
        lastPhrase: "who left in shame, covered in whipped cream.",
      },
      {
        firstPhrase: "With the power of awkward silence,",
        middlePhrase: "{player1} made",
        lastPhrase:
          "{player2} leave just to escape the uncomfortable situation.",
      },
      {
        firstPhrase: "{player1} challenged",
        middlePhrase: "{player2} to a staring contest,",
        lastPhrase: "and after 3 blinks, {player2} surrendered!",
      },
      {
        firstPhrase: "{player1} summoned an army of invisible hamsters,",
        middlePhrase: "and",
        lastPhrase: "{player2} tripped over... nothing?",
      },
      {
        firstPhrase: "With one mighty sneeze,",
        middlePhrase: "{player1} blew",
        lastPhrase: "{player2} right out of the arena!",
      },
      {
        firstPhrase: "While showing off their best dance moves,",
        middlePhrase: "{player1} accidentally bumped",
        lastPhrase: "{player2} right out of the ring!",
      },
      {
        firstPhrase: "In a shocking turn of events,",
        middlePhrase: "{player1} used sarcasm to defeat",
        lastPhrase: "{player2}, who just couldn’t handle the wit.",
      },
      {
        firstPhrase: "{player1} used a Pokémon card as a shield,",
        middlePhrase: "and",
        lastPhrase: "{player2} retreated in awe of their rare Charizard!",
      },
      {
        firstPhrase: "{player1} tried to dab on",
        middlePhrase: "{player2},",
        lastPhrase:
          "but slipped and faceplanted. A valiant attempt, nonetheless!",
      },
      {
        firstPhrase: "{player1} attempted a magic trick,",
        middlePhrase: "but accidentally made",
        lastPhrase: "{player2} disappear. Poof, just like that!",
      },
      {
        firstPhrase: "{player1} challenged",
        middlePhrase: "{player2} to a game of charades,",
        lastPhrase: "but forgot all the clues, leaving everyone confused.",
      },
      {
        firstPhrase: "{player1} unleashed a flurry of dad jokes,",
        middlePhrase: "making",
        lastPhrase:
          "{player2} groan so hard they had to leave the battlefield.",
      },
      {
        firstPhrase: "{player1} sent",
        middlePhrase: "{player2} a text message mid-fight,",
        lastPhrase: "and they got so distracted by emojis they surrendered.",
      },
      {
        firstPhrase: "{player1} tried to use the Force,",
        middlePhrase: "but ended up forcefully sneezing on",
        lastPhrase: "{player2}, who ran off in disgust!",
      },
      {
        firstPhrase: "{player1} busted out some karaoke,",
        middlePhrase: "and",
        lastPhrase:
          "{player2} couldn't handle the high notes and ran for the hills.",
      },
      {
        firstPhrase: "{player1} attempted to roast",
        middlePhrase: "{player2},",
        lastPhrase: "but ended up roasting themselves instead!",
      },
      {
        firstPhrase: "{player1} used a glitter bomb on",
        middlePhrase: "{player2},",
        lastPhrase: "who's now too sparkly to continue the fight!",
      },
      {
        firstPhrase:
          "{player1} unleashed their secret weapon: a dance move so cringey",
        middlePhrase: "{player2} fainted on the spot,",
        lastPhrase: "unable to handle the embarrassment.",
      },
      {
        firstPhrase: "{player1} offered",
        middlePhrase: "{player2} a slice of pizza,",
        lastPhrase:
          "but it was pineapple-topped, and {player2} left?",
      },
      {
        firstPhrase: "{player1} spammed the 'laughing emoji' reaction,",
        middlePhrase: "which left",
        lastPhrase: "{player2} in a spiral of existential crisis.",
      },
      {
        firstPhrase:
          "{player1} made the bold choice to wear socks with sandals,",
        middlePhrase: "and",
        lastPhrase: "{player2} couldn't handle the fashion disaster and fled.",
      },
      {
        firstPhrase: "{player1} opened a bag of chips loudly,",
        middlePhrase: "causing",
        lastPhrase: "{player2} to lose all concentration and quit the fight.",
      },
      {
        firstPhrase: "{player1} tried to high-five",
        middlePhrase: "{player2},",
        lastPhrase:
          "but missed so badly, {player2} left out of pure second-hand embarrassment.",
      },
      {
        firstPhrase: "{player1} made intense eye contact with",
        middlePhrase: "{player2},",
        lastPhrase: "until they blinked and forfeited the match.",
      },
      {
        firstPhrase:
          "{player1} pulled out their phone mid-fight to check Instagram,",
        middlePhrase: "and",
        lastPhrase: "{player2} left out of sheer disappointment.",
      },
      {
        firstPhrase: "{player1} performed an interpretive dance,",
        middlePhrase: "and",
        lastPhrase: "{player2} was so confused they left without a word.",
      },
      {
        firstPhrase: "{player1} tried to do parkour off the walls,",
        middlePhrase: "but ended up tripping over",
        lastPhrase: "{player2}'s shoes.",
      },
      {
        firstPhrase: "{player1} challenged",
        middlePhrase: "{player2} to a thumb war,",
        lastPhrase: "and somehow lost within the first 5 seconds!",
      },
    ];

    let reviveTexts = [
      {
        firstPhrase: "{player1} rose from the ashes like a majestic phoenix,",
        middlePhrase: "but with way more dramatic flair.",
      },
      {
        firstPhrase: "After a quick nap,",
        middlePhrase: "{player1} is back and ready for round two, fully refreshed and slightly confused!",
      },
      {
        firstPhrase: "With the power of caffeine,",
        middlePhrase: "{player1} is back on their feet and jittering with energy!",
      },
      {
        firstPhrase: "A motivational speech from their imaginary coach has revived",
        middlePhrase: "{player1}, who’s now ready to fight... or maybe give another speech!",
      },
      {
        firstPhrase: "With a dramatic gasp,",
        middlePhrase: "{player1} revived, as if they had just remembered they left the oven on!",
      },
      {
        firstPhrase: "Thanks to a nearby health potion (or was it just soda?),",
        middlePhrase: "{player1} is back in action, slightly sticky but determined!",
      },
      {
        firstPhrase: "{player1} pulled themselves together, literally, with duct tape and sheer willpower.",
        middlePhrase: "It’s not pretty, but they’re alive!"
      },
      {
        firstPhrase: "{player1} respawned after solving a difficult CAPTCHA,",
        middlePhrase: "now more frustrated than ever but definitely alive!"
      },
      {
        firstPhrase: "After realizing they missed a level-up opportunity,",
        middlePhrase: "{player1} popped back into existence, ready to grind more XP!"
      },
      {
        firstPhrase: "With the power of positive thinking,",
        middlePhrase: "{player1} is revived and radiating good vibes (and a little bit of glitter).",
      },
      {
        firstPhrase: "A quick snack break has brought",
        middlePhrase: "{player1} back to life, fueled by nachos and pure determination!",
      },
      {
        firstPhrase: "{player1} emerged from the void,",
        middlePhrase: "muttering something about unfinished business... and snack time!",
      },
      {
        firstPhrase: "{player1} received a 'revive' email notification,",
        middlePhrase: "clicked the link, and is now back in the game!",
      },
      {
        firstPhrase: "A sudden burst of Wi-Fi signal revived",
        middlePhrase: "{player1}, who’s back and buffering slightly less!",
      },
      {
        firstPhrase: "{player1} simply refused to stay down,",
        middlePhrase: "and popped back up like an uninvited guest at a party.",
      },
      {
        firstPhrase: "{player1} revived after receiving a group chat meme,",
        middlePhrase: "because who could stay dead after that laugh?",
      },
      {
        firstPhrase: "{player1} regenerated,",
        middlePhrase: "citing the power of sheer pettiness as their fuel.",
      },
      {
        firstPhrase: "After a dramatic monologue,",
        middlePhrase: "{player1} revived, determined to finish their speech.",
      },
      {
        firstPhrase: "{player1} reappeared with a ‘ta-da’,",
        middlePhrase: "because what’s a good comeback without flair?",
      },
      {
        firstPhrase: "{player1} revived after reading the motivational quote on their coffee cup.",
        middlePhrase: "They are now unstoppable (and a little caffeinated)!"
      }
    ];

    let battleTitles = [
      "Celestial Demise",
      "Supernova Shutdown",
      "Nebula Knockout",
      "Orbital Obliteration",
      "Planetary Plummet",
      "Stardust Surrender",
      "Galaxy's End",
      "Eclipse Elimination",
      "Black Hole Beatdown",
      "Interstellar Implosion",
      "Lunar Loss",
      "Solar Smash",
      "Comet Clash",
      "Quasar Quake",
      "Space-time Slapdown",
      "Astral Avalanche",
      "Photon Finish",
      "Cosmic Collapse",
      "Zodiac Zero Hour",
      "Void Victory",
      "Galactic Goner",
      "Stellar Stumble",
      "Asteroid Annihilation",
      "Meteor Mayhem",
      "Cosmic Conundrum",
      "Starfall Standoff",
      "Gravitational Grind",
      "Constellation Catastrophe",
      "Celestial Wipeout",
      "Universal Uprising"
    ];

    // Create a reaction collector
    const filter = (reaction, user) =>
      reaction.emoji.name === reactionEmoji && !user.bot;
    const collector = message.createReactionCollector({ filter, time: 30000 }); // Collect for 60 seconds

    // Log "5 seconds remaining" when there are 5 seconds left
    setTimeout(() => {
      // Create an embed using EmbedBuilder
      const five_seconds_embed = new EmbedBuilder()
        .setTitle("Join Before The Time Runs Out")
        .setDescription("10 Seconds Remaining!!!")
        .setColor(0x24a5c5);
      interaction.followUp({ embeds: [five_seconds_embed], fetchReply: true });
    }, 20000); // 10 seconds delay (30000 - 20000 = 10000 ms)

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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay between battles
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

        let battleText = battleTexts[randomBattlePhraseIndex];
        let reviveText = reviveTexts[randomBattleReviveIndex];

        let finalText = `${battleText.firstPhrase} ${battleText.middlePhrase} ${battleText.lastPhrase}`;
        let reviveTextFinal = `${reviveText.firstPhrase} ${reviveText.middlePhrase}`

        // Perform replacements in separate steps for clarity      
        finalText = finalText
          .replace(/{player1}/g, `<@!${secondParticipant}>`)
          .replace(/{player2}/g, `<@!${firstParticipant}>`);


        // Construct the value field
        battle_embed.addFields({
          name: battleTitles[randomBattleTitleIndex],
          value: finalText,
        });

        // Add the defeated participant to the defeatedParticipants array
        defeatedParticipants.push(firstParticipant);

        if (Math.random() < 0.3 && defeatedParticipants.length > 0) {
          const reviveIndex = Math.floor(
            Math.random() * defeatedParticipants.length
          );
          const revivedParticipant = defeatedParticipants[reviveIndex];

          // Move the revive participant back to participants
          participants.push(revivedParticipant);

          // Remove the defeated participant from the defeatedParticipants array
          defeatedParticipants.splice(reviveIndex, 1);

          reviveTextFinal = reviveTextFinal
          .replace("{player1}", `<@!${revivedParticipant}>`);

          battle_embed.addFields({
            name: "Revival Of A Celestial",
            value: reviveTextFinal,
          });

          // Send the revive announcement
          await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay between battles
          // interaction.followUp({ embeds: [revive_embed] });
        }

        const update_embed = new EmbedBuilder()
          .setTitle("Status Of The Event!")
          .setColor(0x24a5c5);
        update_embed.addFields({
          name: "Alive Participants",
          value:
            participants.length > 0
              ? participants
                  .map((participant) => `<@!${participant}>`)
                  .join("\n") // Display each participant on a new line
              : "None", // Handle case if no one joins
          inline: true,
        });

        update_embed.addFields({
          name: "Defeated Participants",
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

        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay between battles
        interaction.followUp({ embeds: [update_embed] });

        roundsCount++;
      }

      // Once one participant is left, declare the winner
      if (participants.length === 1) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay between battles
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

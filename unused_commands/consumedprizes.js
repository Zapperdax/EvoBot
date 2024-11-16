// const {
//   SlashCommandBuilder,
//   EmbedBuilder,
//   ButtonStyle,
//   ButtonBuilder,
//   ActionRowBuilder,
//   PermissionsBitField,
// } = require("discord.js");
// const fs = require("fs").promises; // Use promises for better handling
// const path = require("path");
// const prizesConsumedPath = path.join(
//   __dirname,
//   "../filing",
//   "prizesconsumed.json"
// );

// const getPrizes = async () => {
//   try {
//     const data = await fs.readFile(prizesConsumedPath, "utf8");
//     return JSON.parse(data); // Parse the JSON data
//   } catch (err) {
//     console.error("Error reading or parsing file: ", err);
//     return []; // Return an empty array on error
//   }
// };

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName("consumedprizes")
//     .setDescription("Shows All The Prizes Consumed"),
//   async execute(interaction) {
//     const guild = interaction.guild;

//     if (
//       !interaction.channel
//         .permissionsFor(interaction.client.user)
//         .has(PermissionsBitField.Flags.ViewChannel)
//     ) {
//       await interaction.reply({
//         content: "I do not have permission to view this channel.",
//         ephemeral: true,
//       });
//       return;
//     }

//     const totalPrizesConsumed = await getPrizes();

//     const itemsPerPage = 10;
//     let currentPage = 1;
//     const totalPages = Math.ceil(totalPrizesConsumed.length / itemsPerPage);

//     function generateEmbed(page) {
//       const startIndex = (page - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       const embed = new EmbedBuilder()
//         .setColor("#bb8368")
//         .setTitle("Prizes Consumed")
//         .setFooter({ text: `Showing page ${page} of ${totalPages}` });
//       for (
//         let i = startIndex;
//         i < endIndex && i < totalPrizesConsumed.length;
//         i++
//       ) {
//         embed.addFields({
//           name: `#${i + 1}`,
//           value: `${totalPrizesConsumed[i]}`,
//           inline: true,
//         });
//       }
//       return embed;
//     }

//     const row = new ActionRowBuilder().addComponents(
//       new ButtonBuilder()
//         .setCustomId("previous")
//         .setStyle(ButtonStyle.Secondary)
//         .setEmoji("⬅️")
//         .setDisabled(true),
//       new ButtonBuilder()
//         .setCustomId("next")
//         .setStyle(ButtonStyle.Success)
//         .setEmoji("➡️")
//         .setDisabled(totalPages === 1),
//       new ButtonBuilder()
//         .setCustomId("trash")
//         .setStyle(ButtonStyle.Danger)
//         .setEmoji("🗑️")
//     );

//     const message = await interaction.reply({
//       embeds: [generateEmbed(currentPage)],
//       components: [row],
//       fetchReply: true,
//     });

//     const filter = (interaction) =>
//       interaction.user.id === interaction.user.id && interaction.isButton();
//     const collector = message.createMessageComponentCollector({
//       filter,
//       time: 60000,
//     });

//     const previousButton = row.components[0];
//     const nextButton = row.components[1];

//     collector.on("collect", async (interaction) => {
//       try {
//         if (interaction.customId === "previous") {
//           currentPage--;
//         } else if (interaction.customId === "next") {
//           currentPage++;
//         } else if (interaction.customId === "trash") {
//           collector.stop();
//           message.delete();
//           return;
//         }

//         if (currentPage === 1) {
//           previousButton.setDisabled(true);
//         } else {
//           previousButton.setDisabled(false);
//         }

//         if (currentPage === totalPages) {
//           nextButton.setDisabled(true);
//         } else {
//           nextButton.setDisabled(false);
//         }

//         const updatedEmbed = generateEmbed(currentPage);

//         await interaction.update({
//           embeds: [updatedEmbed],
//           components: [row],
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     });

//     collector.on("end", async (collected, reason) => {
//       if (reason === "time") {
//         await message.edit({
//           components: [],
//         });
//       }
//     });
//   },
// };

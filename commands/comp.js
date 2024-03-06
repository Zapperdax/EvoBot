// infoCommand.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Comp = require("../Model/compModel");

async function executeInfoCommand(interaction) {
  await interaction.deferReply();
  const roleName = "Verified Plebs";

  const role = interaction.member.roles.cache.find((r) => r.name === roleName);
  if (!role || !interaction.member.roles.cache.has(role.id)) {
    await interaction.editReply({
      content: `You Don't Have Permission To Use This Command`,
      ephemeral: true,
    });
    return;
  }

  const cardName = interaction.options.getString("card-name").toLowerCase();
  const comp = await Comp.findOne({ cardName });
  if (!comp) {
    await interaction.editReply(`Comp For '${cardName}' Not Found.`);
    return;
  }


  const infoEmbed = new EmbedBuilder()
    .setColor("#bb8368")
    .setAuthor({
      name: interaction.user.tag + ` Requested Guide For ${cardName}`,
      iconURL: interaction.user.displayAvatarURL(),
    });

      // Split the compGuide and floorGuide strings by newline character
      const compGuideLines = comp.compGuide.split('\n');
      const floorGuideLines = comp.floorGuide.split('\n');
  
      // Join the lines back together with Discord's line break format
      const formattedCompGuide = compGuideLines.join('\n');
      const formattedFloorGuide = floorGuideLines.join('\n');

    infoEmbed
    .addFields({
      name: "Raid Comps",
      value: `${formattedFloorGuide}`,
    })
    .addFields({
      name: "Floor Guide",
      value: `${formattedCompGuide}`,
    })
    .setTimestamp()
    .setFooter({
      text: "Use /help <command> To Get Information About A Specific Command",
    });
  await interaction.editReply({ embeds: [infoEmbed] });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("comp")
    .setDescription("Provides Raid & Floor Guides.")
    .addStringOption((option) =>
      option
        .setName("card-name")
        .setDescription("Name of Card")
        .setRequired(true)
    ),
  execute: executeInfoCommand,
};

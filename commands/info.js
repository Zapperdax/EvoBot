// infoCommand.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../Model/userModel");
const Donation = require("../Model/donationModel");

async function executeInfoCommand(interaction) {
  await interaction.deferReply();
  const roleName = "The Chosen";
  let emoji = "❌";

  const role = interaction.member.roles.cache.find((r) => r.name === roleName);
  if (!role || !interaction.member.roles.cache.has(role.id)) {
    await interaction.editReply({
      content: `You Don't Have Permission To Use This Command`,
      ephemeral: true,
    });
    return;
  }

  const { weeklyDonation } = await Donation.findOne({
    _id: "63fb483ba6fd21c8d67e04c3",
  });
  const user = await User.findOne({ id: interaction.user.id });
  if (!user) {
    await interaction.editReply("Please Consider Registering");
    return;
  }

  if (user.amount >= weeklyDonation || user.extraWeeks > 0) {
    emoji = "✅";
  }

  const infoEmbed = new EmbedBuilder()
    .setColor("#bb8368")
    .setAuthor({
      name: interaction.user.tag + "'s Weekly Donation",
      iconURL: interaction.user.displayAvatarURL(),
    })
    .addFields({
      name: "Amount Donated This Week",
      value:
        new Intl.NumberFormat().format(user.amount).toString() +
        ` / ${new Intl.NumberFormat().format(weeklyDonation).toString()}\nStatus: ${emoji}\nExtra Weeks: ${user.extraWeeks}`,
    })
    .setTimestamp()
    .setFooter({
      text:
        "Use /help <command> To Get Information About A Specific Command",
    });
  await interaction.editReply({ embeds: [infoEmbed] });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Provides Information About Your Current Week's Donation"),
  execute: executeInfoCommand,
};

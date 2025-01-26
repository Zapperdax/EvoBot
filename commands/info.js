// infoCommand.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../Model/userModel");
const Donation = require("../Model/donationModel");

async function executeInfoCommand(interaction) {
  await interaction.deferReply();
  const roleName = "The Chosen";
  let emoji = "❌";
  let anotherUserChosen = 0;

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
  const selectedUser = interaction.options.getUser("user");
  if (selectedUser) {
    anotherUserChosen = 1;
  }
  const user =
    anotherUserChosen === 1
      ? await User.findOne({ id: interaction.options.getUser("user").id })
      : await User.findOne({ id: interaction.user.id });
  if (!user) {
    await interaction.editReply("No User Found!");
    return;
  }

  if (user.amount >= weeklyDonation || user.extraWeeks > 0) {
    emoji = "✅";
  }

  const infoEmbed = new EmbedBuilder()
    .setColor("#bb8368")
    .setAuthor({
      name:
        anotherUserChosen === 1
          ? selectedUser.username + "'s Weekly Donation"
          : interaction.user.username + "'s Weekly Donation",
      iconURL:
        anotherUserChosen === 1
          ? selectedUser.displayAvatarURL()
          : interaction.user.displayAvatarURL(),
    })
    .addFields({
      name: "Amount Donated This Week",
      value:
        new Intl.NumberFormat().format(user.amount).toString() +
        ` / ${new Intl.NumberFormat()
          .format(weeklyDonation)
          .toString()}\nStatus: ${emoji}\nExtra Weeks: ${
          user.extraWeeks
        }/4\n-# Actual Extra Weeks: ${
          Math.floor(user.amount / weeklyDonation) - 1
        }`,
    })
    .setTimestamp()
    .setFooter({
      text: "Use /help <command> To Get Information About A Specific Command",
    });
  await interaction.editReply({ embeds: [infoEmbed] });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Provides Information About Your Current Week's Donation")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select User")
    ),
  execute: executeInfoCommand,
};

const { SlashCommandBuilder } = require("discord.js");
const User = require("../Model/userModel");
const Donation = require("../Model/donationModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manualadd")
    .setDescription("Add Donation Value To Selected User")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select User").setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Add Amount").setRequired(true)
    ),
  async execute(interaction) {
    const roleNames = ["Eclipse Overseer", "Upper-Moons"]; // Roles to check

    // Check if the user has any of the required roles
    const hasRequiredRole = interaction.member.roles.cache.some((role) =>
      roleNames.includes(role.name)
    );

    if (!hasRequiredRole) {
      await interaction.reply({
        content: `You Don't Have Permission To Use This Command`,
        ephemeral: true,
      });
      return;
    }

    const targettedUser = interaction.options.getUser("user");
    const amount = interaction.options.getNumber("amount");
    const { weeklyDonation } = await Donation.findOne({
      _id: "63fb483ba6fd21c8d67e04c3",
    });

    try {
      const user = await User.findOneAndUpdate(
        { id: targettedUser.id },
        {
          amount,
          donated: amount >= weeklyDonation,
        },
        { new: true }
      );

      if (!user) {
        await interaction.reply(`${targettedUser} Is Not Registered`);
        return;
      }

      await interaction.reply(
        `Successfully Placed ${new Intl.NumberFormat()
          .format(amount)
          .toString()} As ${targettedUser}'s Donation`
      );
    } catch (err) {
      console.error("Error executing manualadd:", err);
      await interaction.reply("Failed To Update Amount");
    }
  },
};

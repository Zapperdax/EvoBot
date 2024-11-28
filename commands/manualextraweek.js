const { SlashCommandBuilder } = require("discord.js");
const User = require("../Model/userModel");
const Donation = require("../Model/donationModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manualextraweek")
    .setDescription("Add Paid Week(s) Value To Selected User")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select User").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("extraweek")
        .setDescription("Add Extra Week(s)")
        .setRequired(true)
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
    const extraweek = interaction.options.getNumber("extraweek");

    try {
      const user = await User.findOneAndUpdate(
        { id: targettedUser.id },
        { extraWeeks: extraweek },
        { new: true }
      );

      if (!user) {
        await interaction.reply(`${targettedUser} Is Not Registered`);
        return;
      }

      await interaction.reply(
        `Successfully Set ${new Intl.NumberFormat()
          .format(extraweek)
          .toString()} As ${targettedUser}'s Extra Weeks`
      );
    } catch (err) {
      console.error("Error updating extra weeks:", err);
      await interaction.reply("Failed To Update Extra Weeks");
    }
  },
};

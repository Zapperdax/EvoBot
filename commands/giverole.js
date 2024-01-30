const {
  SlashCommandBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const User = require("../Model/userModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giverole")
    .setDescription("Give or remove a role from a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to modify the role for")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to give or remove from the user")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const roleName = "Admin";

    const role = interaction.member.roles.cache.find(
      (r) => r.name === roleName
    );
    if (!role || !interaction.member.roles.cache.has(role.id)) {
      await interaction.reply({
        content: `You Don't Have Permission To Use This Command`,
        ephemeral: true,
      });
      return;
    }

    const user = interaction.options.getUser("user");
    const userrole = interaction.options.getRole("role");

    if (!user || !userrole) {
      return interaction.reply({
        content: "Invalid user or role specified.",
        ephemeral: false,
      });
    }

    const member = interaction.guild.members.cache.get(user.id);

    // Check if the user already has the specified role
    if (member.roles.cache.has(userrole.id)) {
      // User has the role, remove it
      await member.roles.remove(userrole);
      if (userrole.id === "1099729210202919042") {
        const targettedUser = member.user.id;

        const confirmButton = new ButtonBuilder()
          .setCustomId("confirm")
          .setEmoji("✅")
          .setStyle(ButtonStyle.Success);

        const cancelButton = new ButtonBuilder()
          .setCustomId("cancel")
          .setEmoji("⚔️")
          .setStyle(ButtonStyle.Danger);

        const resetEmbed = new EmbedBuilder()
          .setColor("#bb8368")
          .setTitle("Confirmation")
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setDescription(
            `Are You Sure You Want To Delete ${"<@" + targettedUser + ">"}?`
          )
          .setFooter({ text: "[Warning] - This Action Cannot Be Undone" });

        const row = new ActionRowBuilder().addComponents(
          confirmButton,
          cancelButton
        );

        try {
          await interaction.followUp({
            content: "Are You Sure?",
            embeds: [resetEmbed],
            components: [row],
          });

          const filter = (i) =>
            i.customId === "confirm" || i.customId === "cancel";
          const collector = interaction.channel.createMessageComponentCollector(
            {
              filter,
              time: 15000,
            }
          );

          collector.on("collect", async (i) => {
            if (i.customId === "confirm") {
              if (i.user.id === interaction.user.id) {
                const deletedUser = await User.findOneAndDelete({
                  id: targettedUser,
                });
                if (!deletedUser) {
                  await interaction.followUp({ content: "No User Found" });
                  return;
                }
                await interaction.followUp({
                  content: `Successfully Deleted ${deletedUser.name}`,
                });

                // Delete the original message after confirming the deletion
                await interaction.deleteReply();
              }
            } else if (i.customId === "cancel") {
              await i.update({ content: "Operation Cancelled" });
            }
            collector.stop();
          });

          collector.on("end", async () => {
            await interaction.followUp({ content: "Operation Completed", components: [], embeds: [] });
          });
        } catch (e) {
          await interaction.followUp(
            "There Was An Error Executing This Command"
          );
        }
      }
      return interaction.followUp({
        content: `Role ${userrole.name} has been removed from ${user.tag}.`,
        ephemeral: false,
      });
    } else {
      // User doesn't have the role, add it
      await member.roles.add(userrole);
      if (userrole.id === "1099729210202919042") {
        try {
          const user = new User({
            id: member.user.id,
            name: member.user.tag,
          });
          await user.save();
          await interaction.editReply(
            "Selected User Was Registered Into The Clan"
          );
        } catch (e) {
          if (e.code === 11000) {
            await interaction.editReply(
              "Selected User Was Already Registered To The Clan"
            );
          }
        }
      }
      return interaction.editReply({
        content: `Role ${userrole.name} has been given to ${user.tag}.`,
        ephemeral: false,
      });
    }
  },
};

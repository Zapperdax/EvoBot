const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  PermissionsBitField,
} = require("discord.js");
const User = require("../Model/userModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("extradonation")
    .setDescription("Shows Extra Contribution Of Users In Clan"),
  async execute(interaction) {
    const guild = interaction.guild;
    const roleName = "The Chosen";

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

    if (
      !interaction.channel
        .permissionsFor(interaction.client.user)
        .has(PermissionsBitField.Flags.ViewChannel)
    ) {
      await interaction.reply({
        content: "I do not have permission to view this channel.",
        ephemeral: true,
      });
      return;
    }

    const donators = await User.find({ extraWeeks: { $gt: 0 } }).sort({
      extraWeeks: -1,
    });

    const donatorsWithUsername = await Promise.all(
      donators.map(async (donator) => {
        try {
          const member = await guild.members.fetch(donator.id);
          return { ...donator.toObject(), username: member.user.username };
        } catch (error) {
          // Handle errors, such as if the member is not found
          console.error(`Error fetching member for user with ID ${donator.id}:`, error.message);
          return { ...donator.toObject(), username: 'Unknown' }; // Default value or handle as needed
        }
      })
    );

    if (donatorsWithUsername.length > 0) {
      const itemsPerPage = 10;
      let currentPage = 1;
      const totalPages = Math.ceil(donatorsWithUsername.length / itemsPerPage);

      function generateEmbed(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const embed = new EmbedBuilder()
          .setColor("#bb8368")
          .setTitle("Users With Extra Donations")
          .setDescription(`Showing All The Users With Extra Donations`)
          .setFooter({ text: `Showing page ${page} of ${totalPages}` });

        for (let i = startIndex; i < endIndex && i < donatorsWithUsername.length; i++) {
          embed.addFields({
            name: `#${i + 1} | ${donatorsWithUsername[i].username}`,
            value: `Weeks Paid: ${donatorsWithUsername[i].extraWeeks}\nID: ${donatorsWithUsername[i].id}`,

            inline: true,
          });
        }

        return embed;
      }

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("previous")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("⬅️")
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("next")
          .setStyle(ButtonStyle.Success)
          .setEmoji("➡️")
          .setDisabled(totalPages === 1),
        new ButtonBuilder()
          .setCustomId("trash")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🗑️")
      );

      const message = await interaction.reply({
        embeds: [generateEmbed(currentPage)],
        components: [row],
        fetchReply: true,
      });

      const filter = (interaction) =>
        interaction.user.id === interaction.user.id && interaction.isButton();
      const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      const previousButton = row.components[0];
      const nextButton = row.components[1];

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "previous") {
          currentPage--;
        } else if (interaction.customId === "next") {
          currentPage++;
        } else if (interaction.customId === "trash") {
          collector.stop();
          message.delete();
          return;
        }

        if (currentPage === 1) {
          previousButton.setDisabled(true);
        } else {
          previousButton.setDisabled(false);
        }

        if (currentPage === totalPages) {
          nextButton.setDisabled(true);
        } else {
          nextButton.setDisabled(false);
        }

        const updatedEmbed = generateEmbed(currentPage);

        await interaction.update({
          embeds: [updatedEmbed],
          components: [row],
        });
      });

      collector.on("end", async (collected, reason) => {
        if (reason === "time") {
          await message.edit({
            components: [],
          });
        }
      });
    } else {
      await interaction.reply({
        content: "No Users Found With Extra Donations",
      });
      return;
    }
  },
};

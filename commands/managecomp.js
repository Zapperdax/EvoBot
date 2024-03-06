const { SlashCommandBuilder } = require("discord.js");
const Comp = require("../Model/compModel");

// Function to handle adding or updating a Comp entry
async function addOrUpdateComp(interaction, cardName, action) {
  try {
    let floorGuide, compGuide;

    const filter = (msg) => !msg.author.bot;

    if (!interaction.replied) {
      await interaction.reply("Please provide the floor guide for this card.");
    }

    const floorGuideMessage = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
    });
    floorGuide = floorGuideMessage.first()?.content;

    if (!floorGuide) {
      await interaction.followUp("Floor Guide Not Provided. Aborting.");
      return;
    }

    if (!interaction.replied) {
      await interaction.reply("Please provide the raid comps for this car.");
    }

    await interaction.followUp("Please provide the raid comps for this card.")

    const compGuideMessage = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
    });
    compGuide = compGuideMessage.first()?.content;

    if (!compGuide) {
      await interaction.followUp("Raid Comps Not Provided. Aborting.");
      return;
    }

    if (action === "add") {
      const existingComp = await Comp.findOne({ cardName });

      if (existingComp) {
        await interaction.followUp(
          `Card with the name '${cardName}' already exists.`
        );
        return;
      }

      const newComp = new Comp({
        cardName,
        compGuide,
        floorGuide,
      });

      await newComp.save();
      await interaction.followUp(`Card '${newComp.cardName}' added successfully!`);
    } else if (action === "update") {
      const updatedComp = await Comp.findOneAndUpdate(
        { cardName },
        { compGuide, floorGuide },
        { new: true }
      );

      if (updatedComp) {
        await interaction.followUp(`Card '${cardName}' updated successfully!`);
      } else {
        await interaction.followUp(`No Card found with the name '${cardName}'.`);
      }
    } else {
      await interaction.followUp(`Invalid action specified.`);
    }
  } catch (error) {
    console.error("Error managing Comp:", error);
    await interaction.reply(`An error occurred while managing the Comp.`);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("managecomp")
    .setDescription("Manage Comp Entries")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Action To Perform")
        .setRequired(true)
        .addChoices(
          { name: "Add", value: "add" },
          { name: "Delete", value: "delete" },
          { name: "Update", value: "update" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("card-name")
        .setDescription("Name of Card")
        .setRequired(true)
    ),
  async execute(interaction) {
    const roleName = "donation-tracker";
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

    const action = interaction.options.getString("action");
    const cardName = interaction.options.getString("card-name").toLowerCase();

    if (action === "add" || action === "update") {
      // Send a reply before calling addOrUpdateComp
      await interaction.reply("Please provide the floor guide for this card:");
      await addOrUpdateComp(interaction, cardName, action);
    } else if (action === "delete") {
      // Delete the Comp entry with the specified card-name
      const deleteComp = await Comp.findOneAndDelete({ cardName });

      if (deleteComp) {
        await interaction.reply(
          `Comp '${deleteComp.cardName}' deleted successfully!`
        );
      } else {
        await interaction.reply(`No Card found with the name '${cardName}'.`);
      }
    } else {
      await interaction.reply(`Invalid action specified.`);
    }
  },
};

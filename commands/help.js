const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows Available Commands")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Enter Command Name")
        .addChoices(
          { name: "/ban", value: "ban" },
          { name: "/kick", value: "kick" },
          { name: "/ping", value: "ping" },
          { name: "/server", value: "server" },
          { name: "/user", value: "user" },
          { name: "/help", value: "help" },
          { name: "/setdonation", value: "set sonation" },
          { name: "/register", value: "register" },
          { name: "/info", value: "info" }
        )
    ),
  async execute(interaction) {
    const command = interaction.options.getString("command");
    let embedColor = "#bb8368";
    let embedTitle = "";
    let embedAuthorName = interaction.user.tag;
    let embedAuthorIcon = interaction.user.displayAvatarURL();
    let embedDescription = "";
    let embedFooter =
      "Use /help <command> To Get Information About A Specific Command";
    let fields;
    if (!command) {
      embedTitle = "Evo Bot Services";
      embedDescription = "Here's A List Of Commands You Can Use";
      fields = [
        {
          name: "Moderation Commands",
          value: "/ban, /kick, /setdonation, /manualadd, /unregister",
        },
        {
          name: "Fun Commands",
          value: "/ping, /server, /user, /register, /info",
        },
        { name: "Help Commands", value: "/help" },
      ];
    } else {
      switch (command) {
        case "ban":
          embedTitle = `Command: ${command}`;
          embedDescription =
            "This Will Ban A User If You Have Perms To BAN_MEMBERS\n[Example]: /ban <Select User>";
          break;
        case "kick":
          embedTitle = `Command: ${command}`;
          embedDescription =
            "This Will Kick A User If You Have Perms KICK_MEMBERS\n[Example]: /kick <Select User>";
          break;
        case "ping":
          embedTitle = `Command: ${command}`;
          embedDescription = "It Just Says Pong As A reply";
          break;
        case "server":
          embedTitle = `Command: ${command}`;
          embedDescription = "Shows Details Of The Server";
          break;
        case "user":
          embedTitle = `Command: ${command}`;
          embedDescription = "Enjoy Pinging Yourself";
          break;
        case "help":
          embedTitle = `Command: ${command}`;
          embedDescription =
            "Use /help <command> To Get Information About A Specific Command\n [Examples]:\n1) /help Returns All Commands\n2) /help <command> Sends Information About Specific Command";
          break;
        case "set donation":
          embedTitle = `Command: ${command}`;
          embedDescription =
            "Use This Command To Log Donation Of The User For The Current Week";
          break;
        case "register":
          embedTitle = `Command: ${command}`;
          embedDescription = "Use This Command To Register Into The Clan";
          break;
        case "info":
          embedTitle = `Command: ${command}`;
          embedDescription = "User This Command To Check Your Weekly Donation";
          break;
        default:
          embedTitle = `Command Not Found`;
          embedColor = "#FF0000";
          embedDescription = `There Was No Command Found With The Name ${command}`;
          break;
      }
    }

    const helpEmbed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(embedTitle)
      .setAuthor({
        name: embedAuthorName,
        iconURL: embedAuthorIcon,
      })
      .setDescription(embedDescription)
      .addFields(fields ? fields : [])
      .setTimestamp()
      .setFooter({
        text: embedFooter,
      });
    await interaction.reply({ embeds: [helpEmbed] });
  },
};

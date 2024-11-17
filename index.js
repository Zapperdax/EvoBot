const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} = require("discord.js");
const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const User = require("./Model/userModel");
const Donation = require("./Model/donationModel");
const Count = require("./Model/CountModel.js");
const { config } = require("./config.js");
const {
  isExpressionValid,
  calculateExpression,
  handleRaidSpawn,
  handleCardSpawn,
} = require("./functions/functions.js");

const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const eventsPath = path.join(__dirname, "./events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, "./commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The Command At ${filePath} is Missing Required "Data" Or "Execute" Property`
    );
  }
}

//To set status of bot, it gades away after some time
client.on("ready", () => {
  client.user.setActivity("Over Clan Donations.", {
    type: ActivityType.Watching,
  });
});

client.on("messageCreate", async (message) => {
  try {
    if (
      message.channelId === config.donationChannelId &&
      message.author.id === config.anigameBotId &&
      message.embeds.length > 0
    ) {
      const embed = message.embeds.find((embed) => {
        const targetTitle = "Success";
        const targetDescription = "you have donated";
        return (
          embed.title.includes(targetTitle) &&
          embed.description.includes(targetDescription)
        );
      });

      if (embed) {
        const { weeklyDonation } = await Donation.findOne({
          _id: "63fb483ba6fd21c8d67e04c3",
        });

        const regex =
          /Summoner \*\*(.+?)\*\*, you have donated \*\*([\d,]+)\*\* Gold/;
        const match = embed.description.match(regex);
        let name = match[1];
        let amount = Number(match[2].replace(/,/g, ""));
        const user = client.users.cache.find((user) => user.username == name);
        const currentUser = await User.findOne({ id: user.id.toString() });
        if (!currentUser) {
          message.channel.send(
            "You Donated Into The Clan, Without Registration, Please Use /register, And Ask An Admin To Log Your Donation."
          );
          return;
        }
        let donated = false;
        const previousDonation = currentUser.amount;
        amount += previousDonation;

        const updateObject = {
          $set: {
            amount,
          },
        };

        const extra = Math.floor((amount - weeklyDonation) / weeklyDonation);
        if (extra >= 1) {
          updateObject.$set.extraWeeks = extra;
        }

        //This is if user got out from negtive donation to positive
        if (amount >= 0 && amount < weeklyDonation * 2) {
          updateObject.$set.extraWeeks = 0;
        } else if (amount < 0) {
          const extra = Math.floor(amount / weeklyDonation);
          updateObject.$set.extraWeeks = extra;
        }

        if (amount >= weeklyDonation && updateObject.$set.extraWeeks >= 0) {
          donated = true;
        }
        updateObject.$set.donated = donated;

        await User.findOneAndUpdate({ id: user.id.toString() }, updateObject);
        message.channel.send(
          `Successfully Updated Your Gold To ${new Intl.NumberFormat().format(
            amount
          )} In Your Donation.`
        );

        let emoji = "❌";

        if (amount >= weeklyDonation || updateObject.$set.extraWeeks > 0) {
          emoji = "✅";
        }

        const infoEmbed = new EmbedBuilder()
          .setColor("#bb8368")
          .setAuthor({
            name: user.displayName + "'s Weekly Donation",
            iconURL: user.avatarURL(),
          })
          .addFields({
            name: "Amount Donated This Week",
            value:
              new Intl.NumberFormat().format(amount).toString() +
              ` / ${new Intl.NumberFormat()
                .format(weeklyDonation)
                .toString()}\nStatus: ${emoji}\nExtra Weeks: ${
                updateObject.$set.extraWeeks
              }`,
          })
          .setTimestamp()
          .setFooter({
            text: "Use /help <command> To Get Information About A Specific Command",
          });
        await message.channel.send({ embeds: [infoEmbed] });
      } else {
        return;
      }
    }

    // if (
    //   !message.author.bot &&
    //   message.content.match(/[+\-*\/^()\d\s.]/) &&
    //   message.content.match(/[+\-*\/^()]/)
    // ) {
    //   const expression = message.content;
    //   calculateExpression(message, expression);
    // }

    if (
      message.channelId === config.raidChannelId &&
      !message.author.bot &&
      message.content.toLowerCase().includes(".rd spawn i".toLowerCase())
    ) {
      // Create a filter to capture the expected bot messages
      const filter = (botMessage) =>
        botMessage.author.id === config.anigameBotId && // Message must be from the correct bot
        botMessage.channelId === config.raidChannelId; // Must be in the correct channel

      // Create a MessageCollector to listen for the bot's response
      const collector = message.channel.createMessageCollector({
        filter,
        time: 2000, // Wait for up to 10 seconds
      });

      collector.on("collect", async (botMessage) => {
        // Check if the bot sent the raid spawn message
        if (
          botMessage.content.includes(
            "Summoner, a Raid Boss has spawned! Check your DMs for more info!"
          )
        ) {
          // Increment the raid count for the user
          await handleRaidSpawn(message, Count);
          collector.stop(); // Stop the collector after successfully handling the response
        }
        // Check if the bot sent the cooldown message
        else if (botMessage.content.includes("This command is on cooldown")) {
          collector.stop(); // Stop the collector if the command is on cooldown
        }
      });

      collector.on("end", (collected, reason) => {
        if (reason === "time") {
          message.channel.send(
            "No response received from the bot within the time limit."
          );
        }
      });
    }

    if (
      message.channelId === config.cardSpawnChannelId &&
      message.author.id === config.anigameBotId &&
      message.embeds.length > 0
    ) {
      const embed = message.embeds.find((embed) => {
        const targetTitle = "What's this?";
        const targetDescription = "A wild AniGame card appears!";

        // Check if the embed has the title and description matching your conditions
        if (
          embed.title &&
          embed.title.includes(targetTitle) &&
          embed.description &&
          embed.description.includes(targetDescription)
        ) {
          // Ensure the author field exists and return the author name
          return embed.author && embed.author.name;
        }
        return false;
      });

      // If an embed is found, log or use the author's name
      if (embed) {
        const authorName = embed.author.name;
        const user = client.users.cache.find(
          (user) => user.username === authorName
        );
        if (user) {
          const guild = message.guild;
          const member = await guild.members.fetch(user.id);

          // Check if the member has the "Evos Cult" role
          const hasRole = member.roles.cache.some(
            (role) => role.name === "Evos Cult"
          );

          if (hasRole) {
            await handleCardSpawn(user.id, authorName, Count);
          } else {
            console.log("Member not in 'Evos Cult' role.");
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
});

mongoose.set("strictQuery", true);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
    client.login(token);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

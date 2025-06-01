const { EmbedBuilder } = require("discord.js");

function isExpressionValid(expression) {
  try {
    // Attempt to evaluate the expression
    eval(expression);
    return true;
  } catch (error) {
    // If an error occurs during evaluation, the expression is invalid
    return false;
  }
}

async function calculateExpression(message, expression) {
  if (isExpressionValid(expression)) {
    try {
      const result = eval(expression.replace("^", "**"));
      const sentMessage = await message.channel.send(
        `Expression: ${expression}`
      );
      await sentMessage.react("✅");

      const filter = (reaction, user) =>
        reaction.emoji.name === "✅" && user.id === message.author.id;

      try {
        const collected = await sentMessage.awaitReactions({
          filter,
          max: 1,
          time: 10000,
          errors: ["time"],
        });

        const reaction = collected.first();
        if (reaction) {
          const resultEmbed = new EmbedBuilder()
            .setColor("#bb8368")
            .setAuthor({
              name: message.author.displayName,
              iconURL: message.author.avatarURL(),
            })
            .addFields({
              name: "Expression Result",
              value: `\`\`\`${new Intl.NumberFormat()
                .format(result)
                .toString()}\`\`\``,
            })
            .setTimestamp()
            .setFooter({
              text: "Use /help <command> To Get Information About A Specific Command",
            });
          await message.channel.send({ embeds: [resultEmbed] });
        }
      } catch (collected) {
        // This block runs if no reaction is collected within the time limit
        await message.channel.send("No Reactions Received.");
      }
    } catch (error) {
      message.channel.send(`Error: ${error}`);
    }
  }
}

async function handleRaidSpawn(message, Count) {
  try {
    const userId = message.author.id;
    const userName = message.author.username;

    // Find the user record or create a new one
    let userRecord = await Count.findOne({ id: userId });
    if (!userRecord) {
      userRecord = new Count({
        id: userId,
        name: userName,
      });
    }

    // Increment the raidsSpawnedCount
    userRecord.raidsSpawnedCount += 1;
    userRecord.name = userName;

    // Save the updated record
    await userRecord.save();
    await message.channel.send(`${userName}, Your Raid Count Increased By 1`);
  } catch (err) {
    console.error("Error updating raid count:", err);
    // await message.channel.send("An error occurred while tracking the raid.");
  }
}

async function handleCardSpawn(userId, userName, Count) {
  try {
    // Find the user record or create a new one
    let userRecord = await Count.findOne({ id: userId });
    if (!userRecord) {
      userRecord = new Count({
        id: userId,
        name: userName,
      });
    }

    // Increment the raidsSpawnedCount
    userRecord.cardsSpawnedCount += 1;
    userRecord.name = userName;

    // Save the updated record
    await userRecord.save();
  } catch (err) {
    console.error("Error updating card count:", err);
    // await message.channel.send("An error occurred while tracking the raid.");
  }
}

module.exports = {
  isExpressionValid,
  calculateExpression,
  handleRaidSpawn,
  handleCardSpawn,
};

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
      const collector = sentMessage.createReactionCollector(filter, {
        time: 10000,
      });

      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "✅") {
            await message.channel.send(`Result: ${result}`);
            collector.stop(); // Stop the collector since we've got the reaction we need
          }
        } catch (error) {
          console.error(error);
        }
      });

      collector.on("end", (collected) => {
        if (collected.size === 0) {
          message.channel.send("No Reactions Received.");
        }
      });
    } catch (error) {
      message.channel.send(`Error: ${error}`);
    }
  }
}

module.exports = { isExpressionValid, calculateExpression };

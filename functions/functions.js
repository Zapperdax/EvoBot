const { EmbedBuilder } = require("discord.js");
const { rankData, curses, blessings } = require("./data.js");

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

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function getRank(aura, breed) {
  const ranks = rankData[breed];
  if (!ranks) return { name: "Unranked", emoji: "" };

  // Find highest matching rank
  let currentRank = ranks[0];
  for (const rank of ranks) {
    if (aura >= rank.threshold) {
      currentRank = rank;
    } else {
      break;
    }
  }

  return currentRank;
}

function getAuraSurgeEmoji(gain) {
  if (gain >= 200) return "💥"; // massive
  if (gain >= 150) return "⚡"; // strong
  if (gain <= 149) return "💤";  // weak
  return ""; // normal
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(map) {
  const entries = Array.from(map.values());
  return entries[Math.floor(Math.random() * entries.length)];
}

function triggerAuraEvent(players, interaction) {
  if (players.size === 0) return;

  const player = pickRandom(players);
  const isBlessing = Math.random() < 0.5;
  const amount = isBlessing
    ? getRandomBetween(100, 300)
    : -getRandomBetween(100, 300);

  player.aura += amount;
  if (player.aura < 0) player.aura = 0; // No negative aura

  const rankInfo = getRank(player.aura, player.breed);
  player.rank = `${rankInfo.emoji} ${rankInfo.name}`;

  const msgPool = isBlessing ? blessings : curses;
  const msgTemplate = msgPool[Math.floor(Math.random() * msgPool.length)];
  const message = msgTemplate.replace("${username}", player.username);

  const eventEmbed = new EmbedBuilder()
    .setTitle(isBlessing ? "🌟 Aura Blessing!" : "💀 Aura Curse!")
    .setDescription(`${message}\n\n${isBlessing ? "🔺" : "🔻"} ${isBlessing ? "+" : ""}${Math.abs(amount)} aura → **${player.aura}** aura\n⠀🏷️ **[${player.rank}]**`)
    .setColor(isBlessing ? 0x2ecc71 : 0xe74c3c)
    .setFooter({ text: "Fate twists in the Aura Field..." });

  interaction.channel.send({ embeds: [eventEmbed] });
}

function triggerDuelEvent(players, interaction) {
  if (players.size < 2) return; // Need at least 2 for a duel

  const playerArray = Array.from(players.values());

  // Pick 2 distinct players
  let [p1, p2] = [null, null];
  while (!p1 || !p2 || p1.username === p2.username) {
    p1 = playerArray[Math.floor(Math.random() * playerArray.length)];
    p2 = playerArray[Math.floor(Math.random() * playerArray.length)];
  }

  // Decide winner and loser
  const isP1Winner = Math.random() < 0.5;
  const winner = isP1Winner ? p1 : p2;
  const loser = isP1Winner ? p2 : p1;

  // Breed emoji
  const breedEmojis = {
    Drakon: '🐉',
    Nyxian: '🦉',
    Vyrn: '🐺',
  };

  const winnerName = `${breedEmojis[winner.breed]} **${winner.username}**`;
  const loserName = `${breedEmojis[loser.breed]} **${loser.username}**`;

  // Reward winner
  const rewardAura = getRandomBetween(50, 100);
  winner.aura += rewardAura;

  // Update rank
  const rankInfo = getRank(winner.aura, winner.breed);
  winner.rank = `${rankInfo.emoji} ${rankInfo.name}`;

  // Duel flavor templates
  const duelTemplates = [
    "{winner} overwhelms {loser} in a blinding strike of aura.",
    "{winner} outmaneuvers {loser} with elemental grace.",
    "{winner} channels raw essence and defeats {loser}.",
    "{loser} falters, and {winner} seizes victory.",
    "{winner} lands the final blow on {loser} in a fierce clash.",
    "A cosmic blast erupts — {winner} rises, {loser} fades."
  ];

  const duelLine = duelTemplates[Math.floor(Math.random() * duelTemplates.length)]
    .replace("{winner}", winnerName)
    .replace("{loser}", loserName);

  const embedDesc = `${duelLine}\n\n🎖️ **${winner.username}** gains **+${rewardAura} aura**!\n⠀🏷️ **[${winner.rank}]**`;

  const duelEmbed = new EmbedBuilder()
    .setTitle(`⚔️ Duel of Fates`)
    .setDescription(embedDesc)
    .setColor(0xff4757)
    .setFooter({ text: "Aura duels are whispers of destiny..." });

  interaction.channel.send({ embeds: [duelEmbed] });
}

function triggerMassAuraShift(players, interaction) {
  if (players.size === 0) return;

  const playerArray = Array.from(players.values());

  // Select 20% of players, always at least 1
  const count = Math.max(1, Math.ceil(playerArray.length * 0.2));

  // Shuffle the array to randomize selection
  const shuffled = playerArray.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  const results = [];

  const blessTexts = [
    "🕊️ {username} was blessed by the winds of Etheria! [+{aura} aura]",
    "🌈 A prism of light shines on {username}. [+{aura} aura]",
    "💫 Celestial grace flows through {username}. [+{aura} aura]",
    "🌟 {username} channels divine flow. [+{aura} aura]",
    "🔥 {username} is invigorated by a solar flare! [+{aura} aura]",
    "⚡ A surge of pure energy radiates from {username}. [+{aura} aura]",
    "🌞 The morning star touches {username}'s spirit. [+{aura} aura]",
    "🧿 Protection wards encircle {username}. [+{aura} aura]",
    "💖 Ancestral love embraces {username}. [+{aura} aura]",
    "🌠 A wishing comet passes above {username}. [+{aura} aura]",
    "🪄 Enchanted winds carry {username} forward. [+{aura} aura]",
    "🌼 Blooming energy surrounds {username}. [+{aura} aura]",
    "🌤️ The light of clarity finds {username}. [+{aura} aura]",
    "🔆 A flash of brilliance illuminates {username}. [+{aura} aura]",
    "🎇 Fireworks of fate explode around {username}. [+{aura} aura]",
    "🫧 Ethereal bubbles lift {username}'s aura. [+{aura} aura]",
    "🎶 Harmonic waves flow through {username}. [+{aura} aura]",
    "🛡️ A guardian spirit shields {username} with strength. [+{aura} aura]",
    "🍀 Fortune smiles widely at {username}. [+{aura} aura]",
    "🕯️ A sacred flame ignites in {username}. [+{aura} aura]",
    "🧚 Aether spirits dance around {username}. [+{aura} aura]",
    "🫶 The universe offers {username} a silent gift. [+{aura} aura]",
    "🎁 Destiny hands {username} an unexpected boon. [+{aura} aura]",
    "🧲 Cosmic magnetism draws power into {username}. [+{aura} aura]",
    "💡 A spark of genius flares in {username}. [+{aura} aura]",
    "👑 Divine recognition shines on {username}. [+{aura} aura]",
    "🌺 Nature itself empowers {username}. [+{aura} aura]",
    "✨ Stardust settles gently on {username}. [+{aura} aura]",
    "🪷 Serene harmony flows within {username}. [+{aura} aura]",
    "🎐 Wind chimes whisper blessings for {username}. [+{aura} aura]"
  ];


  const curseTexts = [
    "☠️ {username} was cursed by ancient whispers... [–{aura} aura]",
    "🌑 Darkness coils around {username}. [–{aura} aura]",
    "🕳️ Aura fracture stuns {username}. [–{aura} aura]",
    "⚫ {username} is drained by shadow vines. [–{aura} aura]",
    "🪦 {username} bears the mark of misfortune. [–{aura} aura]",
    "🪰 A swarm of bad omens clings to {username}. [–{aura} aura]",
    "🥀 {username} withers beneath invisible pressure. [–{aura} aura]",
    "🕸️ Tangled fate ensnares {username}. [–{aura} aura]",
    "📉 Karma takes its toll on {username}. [–{aura} aura]",
    "🧟 Ghostly hands drag down {username}. [–{aura} aura]",
    "⚰️ A spiritual coffin shuts near {username}. [–{aura} aura]",
    "🫥 {username} fades into the void. [–{aura} aura]",
    "🧿 A cursed gaze locks onto {username}. [–{aura} aura]",
    "🥶 A chill creeps into {username}'s core. [–{aura} aura]",
    "🕯️ {username} watches their flame flicker. [–{aura} aura]",
    "💔 A rift tears through {username}’s essence. [–{aura} aura]",
    "🪓 A spectral axe cleaves aura from {username}. [–{aura} aura]",
    "🕳️ {username} slips into a spiral of misfortune. [–{aura} aura]",
    "🔗 Shackles of regret bind {username}. [–{aura} aura]",
    "🌫️ Confusion clouds {username}’s path. [–{aura} aura]",
    "🧛 Shadows siphon life from {username}. [–{aura} aura]",
    "🧱 Aura stagnation traps {username}. [–{aura} aura]",
    "🪤 A karmic trap springs beneath {username}. [–{aura} aura]",
    "🧨 A ripple of chaos consumes {username}. [–{aura} aura]",
    "🕷️ Webs of loss entangle {username}. [–{aura} aura]",
    "💣 A curse detonates inside {username}’s fate. [–{aura} aura]",
    "🎭 Luck tears off its mask around {username}. [–{aura} aura]",
    "⚠️ A glitch in destiny affects {username}. [–{aura} aura]",
    "📵 All signs abandon {username}. [–{aura} aura]",
    "🧬 Corruption pulses through {username}’s soul. [–{aura} aura]"
  ];


  for (const player of selected) {
    const isBlessing = Math.random() < 0.5;
    const auraShift = isBlessing
      ? getRandomBetween(50, 150)
      : -getRandomBetween(30, 100);

    // Update aura
    player.aura += auraShift;
    if (player.aura < 0) player.aura = 0;

    // Update rank
    const rankInfo = getRank(player.aura, player.breed);
    player.rank = `${rankInfo.emoji} ${rankInfo.name}`;

    // Format result message
    const template = isBlessing
      ? blessTexts[Math.floor(Math.random() * blessTexts.length)]
      : curseTexts[Math.floor(Math.random() * curseTexts.length)];

    const msg = template
      .replace("{username}", `**${player.username}**`)
      .replace("{aura}", Math.abs(auraShift));

    results.push(msg);
  }

  // Build embed
  const embed = new EmbedBuilder()
    .setTitle("✨ Mass Aura Shift!")
    .setDescription(results.join("\n"))
    .setColor(0xa29bfe)
    .setFooter({ text: "The field breathes... and chooses its favorites." });

  interaction.channel.send({ embeds: [embed] });
}

module.exports = {
  isExpressionValid,
  calculateExpression,
  handleRaidSpawn,
  handleCardSpawn,
  chunkArray,
  getRank,
  getAuraSurgeEmoji,
  getRandomBetween,
  pickRandom,
  triggerAuraEvent,
  triggerDuelEvent,
  triggerMassAuraShift
};

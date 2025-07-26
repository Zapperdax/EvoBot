const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { breedMap, eventIntroLines, curses, blessings, } = require("../functions/data.js");
const { chunkArray, getRank, getAuraSurgeEmoji, getRandomBetween, pickRandom, triggerAuraEvent, triggerDuelEvent, triggerMassAuraShift } = require("../functions/functions.js");

// In-memory player list (replace with DB for production)
const players = new Map();

// // Dummy players for testing
// players.set("1001", {
//     username: "AetherLad",
//     breed: "Nyxian",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1002", {
//     username: "Zerkon",
//     breed: "Drakon",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1003", {
//     username: "Lupin",
//     breed: "Vyrn",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1004", {
//     username: "Stellara",
//     breed: "Nyxian",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1005", {
//     username: "Ignivar",
//     breed: "Drakon",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1006", {
//     username: "Thorne",
//     breed: "Vyrn",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1007", {
//     username: "Elowen",
//     breed: "Nyxian",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1008", {
//     username: "Blazek",
//     breed: "Drakon",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1009", {
//     username: "Riven",
//     breed: "Vyrn",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1010", {
//     username: "Caelum",
//     breed: "Nyxian",
//     aura: 0,
//     rank: "Unranked"
// });

// players.set("1011", {
//     username: "Nox",
//     breed: "Drakon",
//     aura: 0,
//     rank: "Unranked"
// });



module.exports = {
    data: new SlashCommandBuilder()
        .setName("aura")
        .setDescription("Starts an Aura Farming event"),

    async execute(interaction) {
        // Create an embed using EmbedBuilder
        const embed = new EmbedBuilder()
            .setTitle('🌌 Welcome to the Aura Farm Field')
            .setDescription(`Choose your **Breed** to begin farming aura.\nReact below:`)
            .addFields(
                { name: '🐉 Drakon', value: 'Forged in fire and fury.', inline: true },
                { name: '🦉 Nyxian', value: 'Born of shadows and wisdom.', inline: true },
                { name: '🐺 Vyrn', value: 'Guardians of the storm.', inline: true },
            )
            .setColor(0x9370DB)
            .setFooter({ text: 'Once chosen, your path is set.' });

        // Send the embed
        await interaction.reply({ embeds: [embed], fetchReply: true });
        const sentMessage = await interaction.fetchReply();

        // Add breed reaction emojis
        const emojis = ['🐉', '🦉', '🐺'];
        for (const emoji of emojis) {
            await sentMessage.react(emoji);
        }

        // Set up reaction collector
        const filter = (reaction, user) => {
            return emojis.includes(reaction.emoji.name) && !user.bot;
        };

        const collector = sentMessage.createReactionCollector({ filter, time: 60000 });

        // Log "10 seconds remaining" when there are 10 seconds left
        setTimeout(() => {
            // Create an embed using EmbedBuilder
            const five_seconds_embed = new EmbedBuilder()
                .setTitle("Join Before The Time Runs Out")
                .setDescription("10 Seconds Remaining!!!")
                .setColor(0x24a5c5);
            interaction.followUp({ embeds: [five_seconds_embed], fetchReply: true });
        }, 50000); // 10 seconds delay (65000 - 50000 = 10000 ms)

        collector.on('collect', (reaction, user) => {
            if (players.has(user.id)) return; // Ignore if already joined

            const breed = breedMap[reaction.emoji.name];
            players.set(user.id, {
                username: user.username,
                breed,
                aura: 0,
                rank: 'Unranked',
            });

            // console.log(`✅ ${user.username} joined as ${breed}`);
            // console.log(players);
        });

        collector.on('end', () => {
            if (players.size < 2) {
                return interaction.followUp({
                    content: "❌ Not enough participants to start the Aura Farm. Minimum 2 players required.",
                })
            }

            interaction.followUp({
                content: `✨ Aura Farm has started with ${players.size} participants!`,
            });

            let round = 1;
            let roundLog = [];
            const auraInterval = setInterval(() => {
                for (const [id, player] of players) {
                    const auraGain = getRandomBetween(50, 250); // 50–250 aura per round
                    player.aura += auraGain;

                    const rankInfo = getRank(player.aura, player.breed);
                    player.rank = `${rankInfo.emoji} ${rankInfo.name}`;

                    // roundLog.push(`🔹 **${player.username}** [+${auraGain} aura] → Total: ${player.aura}`);
                    roundLog.push({
                        username: player.username,
                        gain: auraGain,
                        aura: player.aura,
                        rank: player.rank
                    });
                }

                // Sort players by aura gained in descending order
                roundLog.sort((a, b) => b.aura - a.aura);

                // Format sorted log for display
                const formattedLog = roundLog.map(p =>
                    `🔹 **${p.username}** [+${p.gain} aura ${getAuraSurgeEmoji(p.gain)}] → **${p.aura}** aura\n⠀🏷️ **[${p.rank}**]`
                );

                // Split into chunks of 10 for better readability
                const chunks = chunkArray(formattedLog, 10);
                chunks.forEach((chunk, index) => {
                    const auraEmbed = new EmbedBuilder()
                        .setTitle(`🌌 Aura Farming - Round ${round}`)
                        .setDescription(chunk.join('\n'))
                        .setColor(0x6f42c1)
                        .setFooter({ text: `Round ${round}${chunks.length > 1 ? ` (Page ${index + 1})` : ''}` });

                    interaction.channel.send({ embeds: [auraEmbed] });
                })

                // Choose one random event per round
                const roundEvents = [
                    triggerAuraEvent,
                    triggerDuelEvent,
                    triggerMassAuraShift
                ];

                const selectedEvent = roundEvents[Math.floor(Math.random() * roundEvents.length)];
                const introMessage = eventIntroLines[Math.floor(Math.random() * eventIntroLines.length)];

                interaction.channel.send(introMessage).then(() => {
                    setTimeout(() => {
                        selectedEvent(players, interaction);
                        interaction.channel.send("•────────────⋅☾☼☽⋅────────────•");
                        if (round > 10) {
                            clearInterval(auraInterval);

                            const allPlayers = Array.from(players.values());

                            // Sort players by aura descending
                            const sorted = allPlayers.sort((a, b) => b.aura - a.aura);

                            // Decide winner normally
                            let topPlayer = sorted[0];
                            let twistLine = "";

                            // 5% chance to pick the lowest aura player instead
                            const cosmicTwist = Math.random() < 0.05;

                            if (cosmicTwist && sorted.length > 1) {
                                topPlayer = sorted[sorted.length - 1];
                                twistLine = "🔄 *The cosmos shifted... and the lowest aura farmer was crowned instead!*\n\n";
                            }

                            const breedEmojis = {
                                Drakon: '🐉',
                                Nyxian: '🦉',
                                Vyrn: '🐺'
                            };

                            const winnerEmbed = new EmbedBuilder()
                                .setTitle("🌟 Best Aura Farmer Has Been Decided!")
                                .setDescription(
                                    `${twistLine}🥇 **${topPlayer.username}** ${breedEmojis[topPlayer.breed]} (${topPlayer.breed})\n💠 Aura: **${topPlayer.aura}**\n🏷️ Rank: **${topPlayer.rank}**`
                                )
                                .setColor(0xf1c40f)
                                .setFooter({ text: "A new legend rises in the Aura Field..." });

                            interaction.channel.send({ embeds: [winnerEmbed] });
                        }

                    }, 3000); // Short dramatic pause
                });

                round++;
                roundLog = []; // Reset for next round

            }, 10000);

        });
    }
};

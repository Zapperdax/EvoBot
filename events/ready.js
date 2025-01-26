const { Events } = require("discord.js");
const cron = require("cron");
const User = require("../Model/userModel");
const { config } = require("../config.js");
const Donation = require("../Model/donationModel");
const Count = require("../Model/CountModel");
const getRandomMeme = require("./functions/memeapi.js");
const getRandomJoke = require("./functions/jokesapi.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Logged In As ${client.user.tag}`);

    const channel = client.channels.cache.get(config.donationChannelId);
    const memeChannelId = client.channels.cache.get(config.memeChannelId);
    const generalChannelId = client.channels.cache.get(config.generalChannelId);
    const raidChannelId = client.channels.cache.get(config.raidChannelId);
    if (!channel) {
      console.log("No Channel Found");
      return;
    }

    const job0 = new cron.CronJob(
      "0 0 9 * * SUN",
      async () => {
        try {
          const { weeklyDonation } = await Donation.findOne({
            _id: "63fb483ba6fd21c8d67e04c3",
          });

          const nonDonatedUsers = await User.find({ donated: false });
          if (nonDonatedUsers.length > 0) {
            let pingTheseUsers = "";
            nonDonatedUsers.forEach((user) => {
              pingTheseUsers += `<@${user.id}> `;
            });
            channel.send(
              "List Of Users Who Didn't Donate This Week -> " + pingTheseUsers
            );
          }

          // Update users with 'extraWeeks' less than 0 to get 10% more reduction
          await User.updateMany(
            { extraWeeks: { $lt: 0 } },
            {
              $inc: { amount: -(weeklyDonation * 0.15) }, // Apply 15% reduction
            }
          );

          // Update users with 'extraWeeks' less than or equal to 0 to have their donated value to false
          await User.updateMany(
            {
              $and: [
                { extraWeeks: { $lte: 0 } },
                { amount: { $lt: weeklyDonation } },
              ],
            },
            {
              $set: { donated: false }, // Set 'donated' to false
            }
          );

          // Update 'amount' and 'extraWeeks' fields for all users
          await User.updateMany(
            {},
            { $inc: { amount: -weeklyDonation, extraWeeks: -1 } }
          );

          channel.send(
            `Weekly Donations Have Been Resetted, You Guys Can Start Donating For This Week Now ${"<@&740824003932848199>"}`
          );
        } catch (err) {
          console.error(err);
        }
      },
      null,
      true,
      "Asia/Karachi"
    );
    const job1 = new cron.CronJob(
      "0 0 9 * * FRI",
      async () => {
        const nonDonatedUsers = await User.find({ donated: false });
        if (nonDonatedUsers.length > 0) {
          const promises = nonDonatedUsers.map(async (user) => {
            try {
              const userId = user.id;
              const userToDm = await client.users.fetch(userId);
              const dmChannel = await userToDm.createDM();
              return dmChannel.send(
                "Hi, I'm Here To Remind You Of Your Pending Weekly Donation In Evo's Lair ^^"
              );
            } catch (err) {
              console.log(err);
            }
          });
          Promise.all(promises)
            .then(() => {
              console.log("Reminders sent to non-donators.");
              channel.send(
                "Reminder Has Been Sent To Everyone Who Haven't Donated"
              );
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },
      null,
      true,
      "Asia/Karachi"
    );

    // const job2 = new cron.CronJob(
    //   "0 0 */1 * * *",
    //   async () => {
    //     try {
    //       const meme = await getRandomMeme();
    //       memeChannelId.send(meme.description);
    //       memeChannelId.send(meme.url);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   },
    //   null,
    //   true,
    //   "Asia/Karachi"
    // );

    const job3 = new cron.CronJob(
      "0 0 */3 * * *",
      async () => {
        try {
          const joke = await getRandomJoke();
          generalChannelId.send(joke.setup);
          generalChannelId.send(`||${joke.punchline}||`);
        } catch (err) {
          console.error(err);
        }
      },
      null,
      true,
      "Asia/Karachi"
    );

    const job4 = new cron.CronJob(
      "0 0 9 * * SUN",
      async () => {
        try {
          const allResults = await Count.aggregate([
            {
              $addFields: {
                totalSpawnedCount: {
                  $add: ["$raidsSpawnedCount", "$cardsSpawnedCount"], // Add the two fields together
                },
              },
            },
            {
              $sort: { totalSpawnedCount: -1 }, // Sort in descending order by the total spawned count
            },
          ]);

          raidChannelId.send(
            `${"<@&740824003932848199>"}, All Contributers Of Spawns, Top 3 Get Prizes`
          );
          allResults.forEach((user, index) => {
            raidChannelId.send(
              `${index + 1}: **${user.name}** - Total Spawn Count: ${
                user.totalSpawnedCount
              }\n`
            );
          });

          // await Count.updateMany(
          //   {},
          //   {
          //     $set: { raidsSpawnedCount: 0, cardsSpawnedCount: 0 },
          //   }
          // );
          await Count.deleteMany({});

          raidChannelId.send(`Weekly Raid and Card Spawns Have Been Reset`);
        } catch (err) {
          console.error(err);
        }
      },
      null,
      true,
      "Asia/Karachi"
    );

    job0.start();
    job1.start();
    // job2.start();
    job3.start();
    job4.start();
  },
};

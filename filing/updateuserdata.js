const fs = require("fs");
const path = require("path");

// Define the path to the file inside the "filing" folder
const filePath = path.join(__dirname, "deceptionordeceivedata.json");
const prizesFilePath = path.join(__dirname, "prizes.json");
const prizesConsumedPath = path.join(__dirname, "prizesconsumed.json");

const insertIntoPrizesConsumedFile = (prize, userId) => {
  fs.readFile(prizesConsumedPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file: ", err);
      return;
    }
    try {
      const prizes = JSON.parse(data); // Parse the JSON data
      prizes.push(`${userId} ${prize}`);
      const updatedPrizes = JSON.stringify(prizes, null, 2);
      // Write the updated JSON back to the file
      fs.writeFile(prizesConsumedPath, updatedPrizes, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    } catch (parseError) {
      console.error("Error parsing JSON data: ", parseError);
    }
  });
};

const insertPrizeBack = (prize) => {
  fs.readFile(prizesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file: ", err);
      return;
    }
    try {
      const prizes = JSON.parse(data); // Parse the JSON data
      const randomPrizeIndex = Math.floor(Math.random() * (prizes.length + 1)); // Get a random index including last index
      prizes.splice(randomPrizeIndex, 0, prize);
      const updatedPrizes = JSON.stringify(prizes, null, 2);
      // Write the updated JSON back to the file
      fs.writeFile(prizesFilePath, updatedPrizes, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    } catch (parseError) {
      console.error("Error parsing JSON data: ", parseError);
    }
  });
};

const getPrize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(prizesFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file: ", err);
        reject(err); // Reject the promise if there's an error
        return;
      }
      try {
        const prizes = JSON.parse(data); // Parse the JSON data
        const randomPrizeIndex = Math.floor(Math.random() * prizes.length); // Get a random index
        const prize = prizes[randomPrizeIndex];
        prizes.splice(randomPrizeIndex, 1);
        const updatedPrizes = JSON.stringify(prizes, null, 2);
        // Write the updated JSON back to the file
        fs.writeFile(prizesFilePath, updatedPrizes, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return reject(err); // Reject the promise on write error
          }
        });
        resolve(prize); // Resolve the promise with the random prize
      } catch (parseError) {
        console.error("Error parsing JSON data: ", parseError);
        reject(parseError); // Reject the promise if there's a parsing error
      }
    });
  });
};

const updateUserData = (userId, prize) => {
  return new Promise((resolve, reject) => {
    // Read the current content of the file
    let dataToReturn = {
      userId: userId,
      commandUsed: 0, // Initialize commandUsed
      prizesWon: [],
      commandUsedTime: 0,
    };

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return reject(err); // Reject the promise on error
      }

      let jsonData = [];

      // Parse the existing data if the file is not empty
      if (data) {
        try {
          jsonData = JSON.parse(data); // Safely parse the JSON data
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          return reject(parseError); // Reject the promise on parsing error
        }
      }

      // Ensure jsonData is an array
      if (!Array.isArray(jsonData)) {
        console.error("Invalid data format. Expected an array.");
        return reject(new Error("Invalid data format. Expected an array.")); // Reject the promise
      }

      // Check if the user already exists
      let userExists = false;
      for (let user of jsonData) {
        if (user.userId === userId) {
          if (
            user.commandUsedTime + 7200 <= Math.floor(Date.now() / 1000) &&
            user.commandUsed < 5
          ) {
            user.commandUsed += 1; // Increment commandUsed
            user.prizesWon.push(prize);
            user.commandUsedTime = Math.floor(Date.now() / 1000);
            insertIntoPrizesConsumedFile(prize, userId);
          } else {
            insertPrizeBack(prize);
          }
          dataToReturn.commandUsed = user.commandUsed; // Update commandUsed
          dataToReturn.prizesWon = user.prizesWon;
          dataToReturn.commandUsedTime = user.commandUsedTime;
          userExists = true;
          break;
        }
      }

      // If user does not exist, add a new user entry
      if (!userExists) {
        dataToReturn.commandUsed = 1; // Set commandUsed to 1 for new user
        dataToReturn.prizesWon.push(prize); // Push the prize into prizesWon for new user
        dataToReturn.commandUsedTime = Math.floor(Date.now() / 1000);
        insertIntoPrizesConsumedFile(prize, userId);
        jsonData.push({
          userId: userId,
          commandUsed: dataToReturn.commandUsed,
          prizesWon: dataToReturn.prizesWon,
          commandUsedTime: dataToReturn.commandUsedTime,
        });
      }

      // Convert the updated object back to a JSON string
      const updatedJsonString = JSON.stringify(jsonData, null, 2);

      // Write the updated JSON back to the file
      fs.writeFile(filePath, updatedJsonString, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return reject(err); // Reject the promise on write error
        }
        resolve(dataToReturn); // Resolve the promise with the updated data
      });
    });
  });
};

module.exports = { updateUserData, getPrize };

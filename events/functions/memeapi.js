require("dotenv").config();

let getRandomMeme = () => {
  const url = "https://api.apileague.com/retrieve-random-meme?media-type=image";
  const apiKey = process.env.RANDOM_MEME_API;

  return fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

module.exports = getRandomMeme;

let getRandomMeme = () => {
  const url = "https://api.apileague.com/retrieve-random-meme?media-type=image";
  const apiKey = "7bed17055e474072bca41c70b7cd1dd5";

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

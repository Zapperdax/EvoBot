let getRandomJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

module.exports = getRandomJoke;

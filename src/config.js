const config = {
  backendURL: "https://crosswordly-backend.herokuapp.com",
  randomWordsAPI: "https://random-words-api.vercel.app/word",
  SECRET_KEY: new TextEncoder().encode(process.env.SECRET_KEY || "secret-dev")
};

module.exports = config;
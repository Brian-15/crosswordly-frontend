const config = {
  backendURL: process.env.NODE_ENV === "production"
    ? "https://crosswordly-backend.herokuapp.com"
    : "http://localhost:3001",
  randomWordsAPI: "https://random-words-api.vercel.app/word",
  SECRET_KEY: new TextEncoder().encode(process.env.SECRET_KEY || "secret-dev")
};

module.exports = config;
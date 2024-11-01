require("dotenv").config();

const corsOption = {
  origin: process.env.ENV === "dev" ? "*" : process.env.BASE_URL,
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOption;

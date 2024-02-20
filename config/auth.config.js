module.exports = {
  secret: "videkoSecret",
  pgUser:process.env.DB_USER || "postgres",
  pgHost: process.env.DB_HOST || "localhost",
  pgDatabase: process.env.DB_DATABASE ||  "fncl",
  pgPassword: process.env.DB_PASSWORD ||  "Ouvrir1992",
  pgPort: 5432
};

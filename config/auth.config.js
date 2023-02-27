module.exports = {
  secret: "videkoSecret",
  pgUser:process.env.DB_USER || "postgres",
  pgHost: process.env.DB_HOST || "localhost",
  pgDatabase: process.env.DB_DATABASE ||  "senanalyse",
  pgPassword: process.env.DB_PASSWORD ||  "postgres",
  pgPort: 5432
};

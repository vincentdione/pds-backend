
const config = require("../config/auth.config")

module.exports = {
    HOST: process.env.DB_HOST || config.pgHost,
    USER: process.env.DB_USER || config.pgUser,
    PASSWORD: process.env.DB_PASSWORD || config.pgPassword,
    PORT: config.pgPort,
    DB: process.env.DB_PASSWORD || config.pgDatabase,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
} 


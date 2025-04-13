require('dotenv').config(); // importa variables del .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // dialectOptions:{
    //   ssl:{
    //     requiere:true,
    //     rejectUnauthorized:false
    //   }
    // }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions:{
      ssl:{
        requiere:true,
        rejectUnauthorized:false
      }
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_prod',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
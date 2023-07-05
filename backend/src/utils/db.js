const config = require('../config/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.mysql.name,
  config.mysql.user,
  config.mysql.pass,
  {
    host: config.mysql.host,
    dialect: 'mysql',
    port: config.mysql.port,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  {
    define: {
      freezeTableName: true,
      underscoredAll: true,
      underscored: true
    }
  }
)

module.exports = sequelize

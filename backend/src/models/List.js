const { ServiceBroker } = require('moleculer')
const DbService = require('moleculer-db')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize')
const Sequelize = require('sequelize')
const config = require('../config/config')

const { database } = config
const ListBroker = new ServiceBroker()

ListBroker.createService({
  name: 'list',
  mixins: [DbService],
  adapter: new SequelizeAdapter(
    `mysql://root@${database.host}:${database.port}/${database.database}`
  ),
  model: {
    name: 'list',
    define: {
      name: Sequelize.STRING
    },
    options: {}
  }
})

ListBroker.start()

module.exports = ListBroker

const { ServiceBroker } = require('moleculer')
const DbService = require('moleculer-db')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize')
const Sequelize = require('sequelize')
const config = require('../config/config')

const { database } = config
const TaskBroker = new ServiceBroker()

TaskBroker.createService({
  name: 'task',
  mixins: [DbService],
  adapter: new SequelizeAdapter(
    `mysql://root@${database.host}:${database.port}/${database.database}`
  ),
  model: {
    name: 'task',
    define: {
      name: Sequelize.STRING,
      listId: Sequelize.STRING,
      completed: Sequelize.BOOLEAN
    },

    options: {}
  }
})

TaskBroker.start()

module.exports = TaskBroker

const { ServiceBroker } = require('moleculer')
const ApiGatewayService = require('moleculer-web')
const path = require('path')
const express = require('express')
const config = require('./config/config')
const cors = require('cors')

const broker = new ServiceBroker()

broker.loadService(path.join('./src/services', 'List.js'))
broker.loadService(path.join('./src/services', 'Task.js'))

const svc = broker.createService({
  mixins: [ApiGatewayService],
  settings: {
    server: false,
    routes: [
      {
        whitelist: [
          'list.create',
          'list.get',
          'list.getById',
          'task.create',
          'task.get',
          'list.getTaskFromList',
          'task.remove',
          'task.update'
        ],
        aliases: {
          'GET list/:listId/tasks': 'list.getTaskFromList',
          'GET task': 'task.get',
          'GET list': 'list.get',
          'GET list/:id': 'list.getById',
          'POST list': 'list.create',
          'POST task': 'task.create',
          'PUT task/:id': 'task.update',
          'DELETE task/:id': 'task.remove',
          'DELETE list/:id': 'list.remove'
        },
        bodyParsers: {
          json: true
        },
        mappingPolicy: 'all'
      }
    ]
  }
})

const app = express()

app.use(cors())

app.use('/api', svc.express())

app.listen(config.port, () => {
  console.log(`App listening on port: ${config.port}`)
})

broker.start()

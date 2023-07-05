const taskBroker = require('../models/task')
const listBroker = require('../models/List')

const task = {
  name: 'task',
  actions: {
    get: {
      async handler(ctx) {
        try {
          const tasks = await taskBroker.call('task.find')
          return tasks
        } catch (error) {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = 'Error al obtener las tareas'
        }
      }
    },

    create: {
      params: {
        name: { type: 'string' },
        listId: { type: 'number' }
      },
      async handler(ctx) {
        console.log(ctx.params)
        try {
          await listBroker.call('list.get', { id: ctx.params.listId })
        } catch {
          ctx.meta.$statusCode = 404
          ctx.meta.$errorMessage = 'No se encontró la lista'
          return ctx.meta
        }

        try {
          await taskBroker.call('task.create', ctx.params)
          return { body: `Tarea ${ctx.params.name} creada` }
        } catch {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = 'No se ha podido crear la tarea'
          return ctx.meta
        }
      }
    },

    update: {
      params: {
        id: { type: 'string' },
        completed: { type: 'boolean', optional: true },
        name: { type: 'string', optional: true }
      },
      async handler(ctx) {
        const { params } = ctx
        const { id, completed, name } = params
        try {
          const task = await taskBroker.call('task.update', {
            id,
            completed,
            name
          })

          return task
        } catch (error) {
          ctx.meta.$statusCode = error.code || 500
          ctx.meta.$errorMessage = 'No se pudo actualizar la tarea'
          return ctx.meta
        }
      }
    }
  }
}

module.exports = task

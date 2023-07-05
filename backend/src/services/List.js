const listBroker = require('../models/List')
const taskBroker = require('../models/Task')

const list = {
  name: 'list',
  actions: {
    get: {
      async handler(ctx) {
        try {
          const lists = await listBroker.call('list.find')
          return lists
        } catch (error) {
          ctx.meta.$statusCode = 404
          ctx.meta.$errorMessage = 'Error al obtener las listas'
          return ctx.meta
        }
      }
    },
    getTaskFromList: {
      params: {
        listId: { type: 'string' }
      },
      async handler(ctx) {
        const { listId } = ctx.params
        try {
          try {
            await listBroker.call('list.get', { id: listId })
          } catch (error) {
            ctx.meta.$statusCode = 404
            ctx.meta.$errorMessage = 'No se encontró la lista'
            return ctx.meta
          }
          const task = await taskBroker.call('task.find', { query: { listId } })
          return task
        } catch (error) {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = 'Error al obtener las tareas de la lista'
          return ctx.meta
        }
      }
    },
    getById: {
      params: {
        id: { type: 'string' }
      },
      async handler(ctx) {
        const { params } = ctx
        const { id } = params

        try {
          const list = await listBroker.call('list.get', { id })
          return list
        } catch (error) {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = 'Error al obtener la lista'
          return ctx.meta
        }
      }
    },
    create: {
      params: {
        name: { type: 'string' }
      },
      async handler(ctx) {
        const { params } = ctx
        const { name } = params
        try {
          const list = await listBroker.call('list.create', params)
          return list
        } catch (error) {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = `Error al crear la lista ${name}`
          return ctx.meta
        }
      }
    },
    remove: {
      params: {
        id: { type: 'string' }
      },
      async handler(ctx) {
        const { params } = ctx
        const { id } = params

        try {
          await listBroker.call('list.remove', { id })
          return { success: true, message: 'List removed successfully' }
        } catch (error) {
          ctx.meta.$statusCode = 500
          ctx.meta.$errorMessage = `Error al eliminar la lista con ID: ${id}`
          return ctx.meta
        }
      }
    }
  }
}

module.exports = list

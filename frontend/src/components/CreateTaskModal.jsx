import { Dialog } from '@headlessui/react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { createTask } from '../services/tasks'
import Input from './Input'
import AddButton from './buttons/AddButton'

async function handleSubmit(e, listId) {
  e.preventDefault()
  const { target } = e
  const formData = new FormData(target)
  const name = formData.get('task-name')
  console.log(e)

  if (name.length < 4) {
    enqueueSnackbar('La tarea debe contener almenos 4 carácteres', {
      variant: 'error'
    })
    return
  }

  const res = createTask(listId, name)

  if (!res) {
    enqueueSnackbar('Ha ocurrido un error inesperado', { variant: 'error' })
    return
  }

  enqueueSnackbar(`a "${name}" creada`, { variant: 'success' })
}

function CreateTaskModal({ listId, refetchTasks }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <AddButton text="Crear tarea" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-slate-800 p-8">
            <Dialog.Title className="text-white text-xl text-center">
              Crear tarea
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                handleSubmit(e, listId)
                refetchTasks()
                setOpen(false)
              }}
              className="flex gap-4 flex-col mt-4"
            >
              <Input text="Nombre de la tarea" name="task-name" />
              <AddButton text="Añadir tarea" type="submit" />
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

CreateTaskModal.propTypes = {
  listId: PropTypes.number.required,
  refetchTasks: PropTypes.func
}

export default CreateTaskModal

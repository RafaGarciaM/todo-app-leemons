import { Dialog } from '@headlessui/react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { createList } from '../services/lists'
import Input from './Input'
import AddButton from './buttons/AddButton'

async function handleSubmit(e) {
  e.preventDefault()
  const { target } = e
  const formData = new FormData(target)
  const name = formData.get('list-name')

  if (name.length < 4) {
    enqueueSnackbar('La lista debe contener almenos 4 carácteres', {
      variant: 'error'
    })
    return
  }

  const res = await createList(name)

  if (!res) {
    enqueueSnackbar('Ha ocurrido un error inesperado', { variant: 'error' })
    return
  }

  enqueueSnackbar(`Lista "${name}" creada`, { variant: 'success' })
}

function CreateListModal({ refetchLists }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <AddButton text="Crear lista" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-slate-800 p-8">
            <Dialog.Title className="text-white text-xl text-center">
              Crear lista de tareas
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                handleSubmit(e)
                refetchLists()
                setOpen(false)
              }}
              className="flex gap-4 flex-col mt-4"
            >
              <Input text="Nombre de la lista" name="list-name" />
              <AddButton text="Añadir lista" type="submit" />
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

CreateListModal.propTypes = {
  refetchLists: PropTypes.func
}

export default CreateListModal

import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getLists } from '../services/lists'
import CreateListModal from './CreateListModal'
import CreateTaskModal from './CreateTaskModal'
import TaskContainer from './TaskContainer'

function ListContainer() {
  const { data, isLoading, refetch: refetchLists } = useQuery('lists', getLists)
  const [selectedListId, setSelectedListId] = useState(null)

  if (isLoading) return <p>Loading...</p>

  return (
    <section className="w-[800px] bg-gray-500 shadow-xl h-full rounded-xl">
      {data.length > 0 ? (
        <Tab.Group className="  flex flex-row gap-3 p-2 border-b-2 border-black  justify-between">
          <Tab.List className="h-16">
            {data.map(({ name, id }) => (
              <Tab
                className=" pt-0 bg-gray-600 rounded-xl px-2 ui-selected:bg-gray-300 ui-selected:text-black text-white outline-none"
                key={id}
                onClick={() => setSelectedListId(id)}
              >
                {name}
              </Tab>
            ))}
            <div className="flex items-center ml-auto  h-12 ">
              <CreateListModal refetchLists={refetchLists} />
            </div>
          </Tab.List>
        </Tab.Group>
      ) : (
        <div className="flex items-center justify-center w-full h-full flex-col gap-4">
          <h2 className="text-xl text-white">Aún no existe ninguna lista</h2>
          <CreateListModal refetchLists={refetchLists} />
        </div>
      )}

      {selectedListId && (
        <>
          <TaskContainer listId={selectedListId} />
          <CreateTaskModal
            refetchTasks={refetchLists}
            listId={selectedListId}
          />
        </>
      )}
    </section>
  )
}

export default ListContainer

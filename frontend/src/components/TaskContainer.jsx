import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getTasksByListId } from '../services/tasks'

function TaskContainer({ listId }) {
  const { data, isLoading, isError } = useQuery(['tasks', listId], () =>
    getTasksByListId({ listId })
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error al obtener las tareas.</p>
  }

  return (
    <div>
      <div className="overflow-y-auto max-h-505 scrollbar-thumb-gray-900 scrollbar-track-gray-800">
        {data.map((task) => (
          <div
            className="bg-gray-300 rounded-xl p-4 ui-selected:bg-gray-300 ui-selected:text-black ml-10 mr-10 mt-4"
            key={task.id}
          >
            {task.name}
          </div>
        ))}
      </div>
    </div>
  )
}

TaskContainer.propTypes = {
  listId: PropTypes.number.isRequired
}

export default TaskContainer

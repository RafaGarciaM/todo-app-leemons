export async function getTasksByListId({ listId }) {
  const res = await fetch(`http://localhost:3000/api/list/${listId}/tasks`)
  const json = await res.json()
  return json
}

export const createTask = async (listId, taskName) => {
  try {
    const res = await fetch(`http://localhost:3000/api/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: taskName,
        listId
      })
    })
    console.log('a')
    console.log(taskName)
    console.log('b')

    console.log(listId)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getLists = async () => {
  const res = await fetch('http://localhost:3000/api/list')
  const json = await res.json()
  return json
}

export const createList = async (name) => {
  const res = await fetch('http://localhost:3000/api/list', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })

  return res.status === 200
}

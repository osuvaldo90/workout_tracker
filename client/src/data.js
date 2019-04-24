import { generate as shortid } from 'shortid'

export async function getRoutine () {
  const storedRoutine = localStorage.getItem('routine')
  return storedRoutine ? JSON.parse(storedRoutine) : []
}

export async function saveNewDay (newDay) {
  const routine = await getRoutine()
  const id = shortid()

  routine.push({...newDay, id })
  localStorage.setItem('routine', JSON.stringify(routine))

  return true
}

export async function deleteDay (id) {
  const routine = await getRoutine()
  const newRoutine = routine.filter(d => d.id !== id)
  localStorage.setItem('routine', JSON.stringify(newRoutine))
}

export async function getDay (id) {
  const routine = await getRoutine()
  return routine.find(d => d.id === id)
}

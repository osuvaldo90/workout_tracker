export async function getRoutine () {
  const storedRoutine = localStorage.getItem('routine')
  return storedRoutine ? JSON.parse(storedRoutine) : []
}

export function saveNewDay (newDay) {
  const storedDays = localStorage.getItem('routine')
  const days = storedDays ? JSON.parse(storedDays) : []
  const id = days.length > 0 ? days[days.length - 1].id + 1 : 0

  days.push({...newDay, id })
  localStorage.setItem('routine', JSON.stringify(days))

  return true
}

export interface Client {
  childId: string
  name: { fullName: string }
  checkedIn: boolean
}

const tokens = {
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
  groupId: import.meta.env.VITE_GROUP_ID,
  institutionId: import.meta.env.VITE_INSTITUTION_ID,
}

const cache = new Map()
function dataCache(data?: unknown) {
  if (data) {
    cache.set('cache', data)
  }

  return cache.get('cache')
}

async function fetchClients(start = 0, end = 10) {
  const dataStore = dataCache()

  if (dataStore) {
    console.info('Returning data from cache')
    return {
      total: dataStore.total,
      clients: dataStore.clients.slice(start, end),
    }
  }

  const response = await window.fetch(
    `https://app.famly.co/api/daycare/tablet/group?accessToken=${tokens.accessToken}&groupId=${tokens.groupId}&institutionId=${tokens.institutionId}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    }
  )
  const data = await response.json()

  if (response.ok) {
    const clients = data.children
    const total = data.children.length // simulate total count response in the API
    if (clients) {
      dataCache({ total, clients })
      return { total, clients: clients.slice(start, end) }
    }

    return Promise.reject(new Error('Unable to load data'))
  } else {
    const error = {
      message: data?.error,
    }
    return Promise.reject(error)
  }
}

export default fetchClients

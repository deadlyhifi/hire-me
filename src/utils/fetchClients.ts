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

async function fetchClients() {
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
    if (clients) {
      return clients
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

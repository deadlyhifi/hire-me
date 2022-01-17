export interface Checkin {
  childId: string
}

async function checkinClient(clientId: string) {
  const response = await window.fetch(
    `https://app.famly.co/api/v2/children/${clientId}/checkins`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        // pickupTime: '16:00',
      }),
    }
  )
  const data = await response.json()

  if (response.ok) {
    const client = data.childId
    if (client) {
      return client
    }

    return Promise.reject(new Error(`Unable to checkin client: ${clientId}`))
  } else {
    const error = {
      message: data?.error,
    }
    return Promise.reject(error)
  }
}

export default checkinClient

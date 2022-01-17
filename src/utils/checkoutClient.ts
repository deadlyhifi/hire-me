export interface Checkout {
  childId: string
}

async function checkoutClient(clientId: string) {
  const response = await window.fetch(
    `https://app.famly.co/api/v2/children/${clientId}/checkout`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
      }),
    }
  )
  const data = await response.json()

  if (response.ok) {
    const clients = data.map((client: { childId: string }) => client.childId)
    if (clients) {
      return clients
    }

    return Promise.reject(new Error(`Unable to checkout client: ${clientId}`))
  } else {
    const error = {
      message: data?.error,
    }
    return Promise.reject(error)
  }
}

export default checkoutClient

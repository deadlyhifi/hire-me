import { useState } from 'react'
import checkinClient from '../utils/checkinClient'
import checkoutClient from '../utils/checkoutClient'
import type { Client } from '../utils/fetchClients'

import './AttendanceList.css'

type AttendanceListProps = {
  clients: Client[] | null
}

function AttendanceList({ clients }: AttendanceListProps) {
  const [loadCount, setLoadCount] = useState(10)
  const [clientsToDisplay, setClientsToDisplay] = useState(
    clients?.slice(0, loadCount)
  )
  // keep a list of clients that are checked in
  // and ammend after checkin/checkout.
  const checkedInClients =
    (clients
      ?.map((client) => client.checkedIn && client.childId)
      .filter(Boolean) as string[]) || []
  const [checkedIn, setCheckedIn] = useState<Array<string>>(checkedInClients)

  if (!clients || !clientsToDisplay) {
    return null
  }

  const hasMoreToLoad = loadCount < clients?.length

  const handleLoadMore = () => {
    setLoadCount(loadCount + 10)
    setClientsToDisplay(clients?.slice(0, loadCount + 10))
  }

  const handleCheckin = async (childId: string) => {
    const clientId = await checkinClient(childId).catch((error: Error) => {
      console.error('Error: ' + error.message)
    })

    if (clientId) {
      setCheckedIn([...new Set([...checkedIn, clientId])])
    }
  }

  const handleCheckout = async (childId: string) => {
    const clientIds = await checkoutClient(childId).catch((error) => {
      console.error('Error: ' + error.message)
    })

    if (clientIds) {
      const newCheckedInList = checkedIn.filter((id) => !clientIds.includes(id))
      setCheckedIn(newCheckedInList)
    }
  }

  return (
    <>
      <ol>
        {clientsToDisplay.map((client) => {
          const canCheckIn = !checkedIn.includes(client.childId)

          return (
            <li key={client.childId}>
              <span>{client.name.fullName}</span>
              <span>
                <button
                  onClick={() => handleCheckin(client.childId)}
                  disabled={!canCheckIn}
                >
                  Check-in
                </button>{' '}
                <button
                  onClick={() => handleCheckout(client.childId)}
                  disabled={canCheckIn}
                >
                  Check-out
                </button>
              </span>
            </li>
          )
        })}
      </ol>
      {
        <button onClick={handleLoadMore} disabled={!hasMoreToLoad}>
          Load More.
        </button>
      }
    </>
  )
}

export default AttendanceList

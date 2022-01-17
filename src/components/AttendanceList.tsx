import { useState } from 'react'
// import checkinClient from '../utils/checkinClient'
// import checkoutClient from '../utils/checkoutClient'
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
  if (!clients || !clientsToDisplay) {
    return null
  }

  const hasMoreToLoad = loadCount < clients?.length

  const handleLoadMore = () => {
    setLoadCount(loadCount + 10)
    setClientsToDisplay(clients?.slice(0, loadCount + 10))
  }

  return (
    <>
      <ol>
        {clientsToDisplay.map((client) => {
          return (
            <li key={client.childId}>
              {client.name.fullName}
              </span> */}
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

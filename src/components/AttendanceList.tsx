import type { Client } from '../utils/fetchClients'

import './AttendanceList.css'

type AttendanceListProps = {
  clients?: Client[]
  allLoaded: boolean
  loadMore: () => void
}

function AttendanceList({ clients, allLoaded, loadMore }: AttendanceListProps) {
  if (!clients) {
    return null
  }

  return (
    <>
      <ol>
        {clients.map((client) => {
          return (
            <li key={client.childId}>
              <span>{client.name.fullName}</span>
            </li>
          )
        })}
      </ol>
      <button onClick={loadMore} disabled={allLoaded}>
        {allLoaded ? 'No more to load' : 'Load more'}
      </button>
    </>
  )
}

export default AttendanceList

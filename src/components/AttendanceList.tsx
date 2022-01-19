import type { Client } from '../utils/fetchClients'
import CheckinToggle, { CheckinToggleError } from './CheckinToggle'

import './AttendanceList.css'
import { ErrorBoundary } from 'react-error-boundary'

type AttendanceListProps = {
  clients: Client[]
  allLoaded: boolean
  loadMore: () => void
}

function AttendanceList({ clients, allLoaded, loadMore }: AttendanceListProps) {
  return (
    <>
      <ol>
        {clients.map((client) => {
          return (
            <li key={client.childId}>
              <span className={client.checkedIn ? 'checkedIn' : 'checkedOut'}>
                {client.name.fullName}
              </span>
              <ErrorBoundary FallbackComponent={CheckinToggleError}>
                <CheckinToggle
                  clientId={client.childId}
                  isCheckedIn={client.checkedIn}
                />
              </ErrorBoundary>
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

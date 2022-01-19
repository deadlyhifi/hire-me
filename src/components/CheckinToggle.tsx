import { useErrorHandler } from 'react-error-boundary'
import useAsync from '../hooks/useAsync'
import { State, useClient } from '../state/ClientContext'
import checkinClient from '../utils/checkinClient'
import checkoutClient from '../utils/checkoutClient'
import type { Client } from '../utils/fetchClients'

type CheckinToggleProps = {
  clientId: Client['childId']
  isCheckedIn: boolean
}

function CheckinToggle({ clientId, isCheckedIn }: CheckinToggleProps) {
  const { dispatch } = useClient()
  const { status, run } = useAsync<State>({
    status: 'idle',
  })
  const handleError = useErrorHandler()

  const runCheck = () => {
    {
      isCheckedIn
        ? run(
            checkoutClient(clientId).then(
              (data) => {
                dispatch({
                  type: 'CHECKOUT_CLIENT',
                  clientId: data,
                })
              },
              (error) => handleError(error)
            )
          )
        : run(
            checkinClient(clientId).then(
              (data) => {
                dispatch({
                  type: 'CHECKIN_CLIENT',
                  clientId: data,
                })
              },
              (error) => handleError(error)
            )
          )
    }
  }

  return (
    <button onClick={runCheck} disabled={status === 'pending'}>
      {status === 'pending'
        ? 'Loading...'
        : isCheckedIn
        ? 'Check Out'
        : 'Check In'}
    </button>
  )
}

export function CheckinToggleError({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  console.error('ErrorBoundary', error)
  return (
    <>
      <p role="alert">Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  )
}

export default CheckinToggle

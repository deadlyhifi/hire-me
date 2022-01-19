import { useCallback, useEffect } from 'react'
import useAsync from '../hooks/useAsync'
import { useClient } from '../state/ClientContext'
import fetchClients, { Client } from '../utils/fetchClients'
import AttendanceList from './AttendanceList'
import AttendanceListLoading from './AttendanceListLoading'

function AttendanceManagement() {
  const { state, dispatch } = useClient()
  const { status, error, run } = useAsync<Client[]>({
    status: 'pending',
  })

  const { clients, next, allLoaded } = state

  const runFetchClients = useCallback(
    (from = 0, to = 10) => {
      run(
        fetchClients(from, to).then((data) => {
          dispatch({
            type: 'LOAD_CLIENTS',
            data,
          })
          return data
        })
      )
    },
    [dispatch, run]
  )

  useEffect(() => {
    runFetchClients()
  }, [runFetchClients])

  const loadMore = () => {
    runFetchClients(next, next + 10)
  }

  switch (status) {
    case 'pending':
      return <AttendanceListLoading />
    case 'rejected':
      throw error
    case 'resolved':
      return (
        <AttendanceList
          clients={clients}
          allLoaded={allLoaded}
          loadMore={loadMore}
        />
      )
    default:
      throw new Error('This should be impossible')
  }
}

export default AttendanceManagement

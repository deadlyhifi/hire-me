import { useEffect } from 'react'
import useAsync from '../hooks/useAsync'
import fetchClients, { Client } from '../utils/fetchClients'
import AttendanceList from './AttendanceList'
import AttendanceListLoading from './AttendanceListLoading'

function AttendanceManagement() {
  const { data, status, error, run } = useAsync<Client[]>({
    status: 'pending',
  })

  useEffect(() => {
    run(fetchClients())
  }, [run])

  switch (status) {
    case 'pending':
      return <AttendanceListLoading />
    case 'rejected':
      throw error
    case 'resolved':
      return <AttendanceList clients={data} />
    default:
      throw new Error('This should be impossible')
  }
}

export default AttendanceManagement

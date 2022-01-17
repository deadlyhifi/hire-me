import { useState } from 'react'
// import checkinClient from '../utils/checkinClient'
// import checkoutClient from '../utils/checkoutClient'
import type { Client } from '../utils/fetchClients'

import './AttendanceList.css'

type AttendanceListProps = {
  clients: Client[] | null
}

function AttendanceList({ clients }: AttendanceListProps) {
  return (
    <>
      <ol>
        {clients.map((client) => {
          return (
            <li key={client.childId}>
              {client.name.fullName}
              </span> */}
            </li>
          )
        })}
      </ol>
    </>
  )
}

export default AttendanceList

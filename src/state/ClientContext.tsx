import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Client } from '../utils/fetchClients'

type LoadClientAction = {
  type: 'LOAD_CLIENTS'
  data: {
    clients: Client[]
    total: number
  }
}
type CheckinClientAction = {
  type: 'CHECKIN_CLIENT'
  clientId: Client['childId']
  // time?: Date
}
type CheckouClientAction = {
  type: 'CHECKOUT_CLIENT'
  clientId: Client['childId']
}
export type Action =
  | LoadClientAction
  | CheckinClientAction
  | CheckouClientAction
export type Dispatch = (action: Action) => void
export type State = {
  clients: Client[]
  total: number
  next: number
  allLoaded: boolean
}
type Context = { state: State; dispatch: Dispatch } | undefined

const defaultState: State = {
  clients: [],
  total: 0,
  next: 0,
  allLoaded: false,
}

const ClientContext = createContext<Context>(undefined)

function clientReducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOAD_CLIENTS': {
      const clients = [...(state.clients || []), ...action.data.clients]
      const next = clients.length
      const allLoaded = clients.length >= action.data.total

      return {
        ...state,
        clients,
        total: action.data.total,
        next,
        allLoaded,
      }
    }
    case 'CHECKIN_CLIENT': {
      const updatedClients = state.clients.map((client) => {
        if (client.childId === action.clientId) {
          return {
            ...client,
            checkedIn: true,
          }
        }
        return client
      })

      return {
        ...state,
        clients: updatedClients,
      }
    }
    case 'CHECKOUT_CLIENT': {
      const updatedClients = state.clients.map((client) => {
        if (action.clientId.includes(client.childId)) {
          return {
            ...client,
            checkedIn: false,
          }
        }
        return client
      })
      return {
        ...state,
        clients: updatedClients,
      }
    }
    default: {
      throw new Error('Unhandled action type:')
    }
  }
}

function ClientProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(clientReducer, defaultState)

  return (
    <ClientContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientContext.Provider>
  )
}

function useClient() {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error('useClient must be used within the ClientProvider')
  }
  return context
}

export { ClientProvider, useClient }

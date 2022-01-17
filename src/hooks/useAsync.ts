import { Reducer, useCallback, useReducer } from 'react'
import useSafeDispatch from './useSafeDispatch'

export type FetchStatus = 'pending' | 'rejected' | 'resolved'
export type FetchAction<T> = {
  type: FetchStatus
  data: T
  error: Error
}
export type FetchState<T> =
  | {
      status: Extract<FetchStatus, 'pending'>
      data: null
      error: null
    }
  | {
      status: Extract<FetchStatus, 'rejected'>
      data: null
      error: Error
    }
  | {
      status: Extract<FetchStatus, 'resolved'>
      data: T
      error: null
    }

function asyncReducer<T>(
  _state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync<T>(initialState: Record<string, unknown>) {
  const [state, unsafeDispatch] = useReducer<
    Reducer<FetchState<T>, FetchAction<T>>
  >(asyncReducer, {
    status: 'pending',
    data: null,
    error: null,
    ...initialState,
  })
  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = useCallback(
    (promise) => {
      dispatch({ type: 'pending' })
      promise.then(
        (data: T) => {
          dispatch({ type: 'resolved', data })
        },
        (error: Error) => {
          dispatch({ type: 'rejected', error })
        }
      )
    },
    [dispatch]
  )

  return { ...state, run }
}

export default useAsync

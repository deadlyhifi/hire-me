import { Dispatch, useCallback, useLayoutEffect, useRef } from 'react'

function useSafeDispatch<T>(dispatch: Dispatch<T>) {
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(
    (args) => {
      if (mountedRef.current) {
        dispatch(args)
      }
    },
    [dispatch]
  )
}

export default useSafeDispatch

import { DependencyList, useCallback, useEffect, useRef } from 'react'
import { useAsRef } from './useAsRef'

export const useDebounceCallback = <T extends ((...args: any[]) => void)>(fn: T, wait = 500, deps?: DependencyList): ((...args: Parameters<T>) => void) => {
  const timeout = useRef<NodeJS.Timeout>()
  const fnRef = useAsRef(fn)

  const cleanupRef = useAsRef(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  })

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => {
    const cleanup = cleanupRef.current
    return () => {
      cleanup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  // track args & timeout handle between calls
  const argsRef = useRef<any[]>([])

  return useCallback((...args: any[]) => {
    // capture latest args
    argsRef.current = args

    // clear debounce timer
    cleanupRef.current()

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        fnRef.current(...argsRef.current)
      }
    }, wait)
  }, [cleanupRef, fnRef, wait])
}

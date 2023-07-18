import { useEffect, useRef } from 'react'

export const useAsRef = <T>(dep: T) => {
  const ref = useRef(dep)

  useEffect(() => {
    ref.current = dep
  }, [dep])

  return ref
}

import { DependencyList, EffectCallback, useEffect } from 'react'
import { useAsRef } from './useAsRef'

export const useDebounce = (effect: EffectCallback, wait = 500, deps?: DependencyList) => {
  const effectRef = useAsRef(effect)
  const waitRef = useAsRef(wait)

  useEffect(() => {
    const timer = setTimeout(effectRef.current, waitRef.current)
    return () => {
      clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import { useAsRef } from './useAsRef'

export const useDidMountDebounce = (effect: EffectCallback, wait = 500, deps?: DependencyList) => {
  const didMount = useRef(false)
  const effectRef = useAsRef(effect)
  const waitRef = useAsRef(wait)

  useEffect(() => {
    if (didMount.current) {
      const timer = setTimeout(effectRef.current, waitRef.current)
      return () => {
        clearTimeout(timer)
      }
    } else {
      didMount.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import { useAsRef } from './useAsRef'

export const useDidMountEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const didMount = useRef(false)
  const effectRef = useAsRef(effect)

  useEffect(() => {
    if (didMount.current) {
      return effectRef.current()
    } else {
      didMount.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { DependencyList, useEffect } from 'react'
import { Subject } from 'rxjs'
import { useAsRef } from './useAsRef'

export const useUnsubscribeEffect = (
  effect: (unsubscribe$: Subject<void>) => ReturnType<Parameters<typeof useEffect>[0]>,
  deps?: DependencyList
) => {
  const effectRef = useAsRef(effect)

  useEffect(() => {
    const unsubscribe$ = new Subject<void>()

    const destructor = effectRef.current(unsubscribe$)

    return () => {
      unsubscribe$.next()
      unsubscribe$.complete()
      if (typeof destructor === 'function') {
        destructor()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

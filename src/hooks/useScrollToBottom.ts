import { useEffect, useMemo, useRef } from 'react'
import { Subject, fromEvent, of } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

export function useScrollToBottom() {
  const ref = useRef<HTMLDivElement>(null)

  const scroll$ = useMemo(() => {
    const refCurrent = ref.current
    if (refCurrent) {
      return fromEvent(refCurrent, 'scroll').pipe(
        tap(() => console.log('scroll')),
        map(() => refCurrent.scrollHeight - refCurrent.scrollTop === refCurrent.clientHeight),
        filter(reachedBottom => reachedBottom)
      )
    }

    return of()
  }, [ref])

  const scrollSubject = useMemo(() => new Subject<void>(), [])

  useEffect(() => {
    const subscription = scroll$.subscribe(() => {
      scrollSubject.next()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [scroll$, scrollSubject])

  return { scrollSubject, ref }
}

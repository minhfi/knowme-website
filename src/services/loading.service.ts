import { BehaviorSubject } from 'rxjs'

export const LoadingService = new (
  class {
    readonly loading$ = new BehaviorSubject<boolean>(false)

    get loading() {
      return this.loading$.getValue()
    }

    set loading(value) {
      this.loading$.next(value)
    }
  }
)()

import { SyntheticEvent } from 'react'

export class EventUtils {
  /**
   * @param {Event|SyntheticEvent} e
   */
  static preventDefault(e?: Event|SyntheticEvent) {
    e?.preventDefault()
  }

  /**
   * @param {Event|SyntheticEvent} e
   */
  static stopPropagation(e: Event|SyntheticEvent) {
    e.stopPropagation()
  }
}

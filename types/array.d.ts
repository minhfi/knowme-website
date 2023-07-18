interface Array<T> {
  /**
   * This method resets the array length to 0.
   */
  clear(): void

  /**
   * This method return random shuffle item.
   */
  random(): T
}

interface ArrayConstructor {
  ensure<T = any>(array: T | T[], defaults?: T[]): T[]
}
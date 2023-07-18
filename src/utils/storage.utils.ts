let _storage: Storage = typeof window === 'undefined'
  ? {
    length: 0,
    clear: () => null,
    key: () => null,
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null
  }
  : window?.localStorage || window?.sessionStorage

export class StorageUtils {
  /**
   * Get storage item
   */
  static getItem <T = any>(key: string): T | void {
    try {
      const val = _storage.getItem(key)
      return val ? JSON.parse(val) : undefined
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Set storage item
   */
  static setItem(key: string, value?: any) {
    return _storage.setItem(
      key,
      JSON.stringify(value)
    )
  }

  /**
   * Remove Storage item
   */
  static removeItem(key: string) {
    return _storage.removeItem(key)
  }

  static useLocalStorage() {
    _storage = window?.localStorage
  }

  static uesSessionStorage() {
    _storage = window?.sessionStorage
  }
}

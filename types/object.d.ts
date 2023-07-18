interface ObjectConstructor {
  isObject(obj?: any): boolean
  ensure<T = { [key: string]: any }>(obj?: any, defaultVal?: { [key: string]: any }): T
}

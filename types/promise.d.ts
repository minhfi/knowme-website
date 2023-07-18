interface PromiseConstructor {
  settled<T = any>(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void
    ) => void
  ): Promise<{
    status: 'fulfilled'
    value: T
  } | {
    status: 'rejected'
    reason?: any
  }>

  timeout<T = any>(promise: Promise<T>, ms?: number): Promise<T>
  sleep<T = any>(ms?: number): Promise<T>
}

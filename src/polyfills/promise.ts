if (!Promise.sleep) {
  Promise.sleep = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms))
}

if (!Promise.timeout) {
  Promise.timeout = <T = any>(promise: Promise<T>, ms?: number) => Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(reject, ms))
  ]) as Promise<T>
}

if (!Promise.settled) {
  Promise.settled = <T = any>(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void
    ) => void
  ) => (new Promise(executor))
    .then((value) => ({
      status: 'fulfilled',
      value
    }))
    .catch((reason) => ({
      status: 'rejected',
      reason
    })) as Promise<{
      status: 'fulfilled'
      value: T
    } | {
      status: 'rejected'
      reason?: any
    }>
}

export { }

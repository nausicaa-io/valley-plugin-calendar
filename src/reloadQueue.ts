export function createReloadQueue<T>(read: () => Promise<T>, publish: (value: T) => void, onError?: (error: unknown) => void): {
  reload: () => Promise<void>
  dispose: () => void
} {
  let pending: Promise<void> | null = null
  let dirty = false
  let disposed = false
  return {
    reload: () => {
      if (disposed) return Promise.resolve()
      dirty = true
      if (!pending) {
        pending = (async () => {
          while (dirty && !disposed) {
            dirty = false
            const value = await read()
            if (!dirty && !disposed) publish(value)
          }
        })().finally(() => { pending = null })
        if (onError) void pending.catch(onError)
      }
      return pending
    },
    dispose: () => { disposed = true }
  }
}

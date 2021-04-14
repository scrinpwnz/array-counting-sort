export const createDebounce = (callback: () => any, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(callback, ms)
  }
}

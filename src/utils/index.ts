export function localGet(key: string) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}

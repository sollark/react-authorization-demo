export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

type EmptyObject = {}
export function isEmptyObject(obj: unknown): obj is EmptyObject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj as object).length === 0
  )
}

export function isOfType<T>(obj: any, type: { new (): T }): obj is T {
  return typeof obj === 'object' && obj instanceof type
}

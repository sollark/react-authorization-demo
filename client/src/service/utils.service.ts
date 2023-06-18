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

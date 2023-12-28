const NODE_ENV = import.meta.env.VITE_NODE_ENV
const isDevelopmentEnvironment = NODE_ENV === 'development'

function log(...args: any[]) {
  if (isDevelopmentEnvironment) {
    console.log(...args)
  }
}

function error(...args: any[]) {
  if (isDevelopmentEnvironment) {
    console.error(...args)
  }
}

function warn(...args: any[]) {
  if (isDevelopmentEnvironment) {
    console.warn(...args)
  }
}

// Add other console methods as needed

export { log, error, warn }

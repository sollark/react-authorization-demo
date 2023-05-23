import fs from 'fs'
import { asyncLocalStorage } from './als.service.js'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// define the time format
function getTime(): string {
  const now = new Date()
  return now.toLocaleString('he')
}

function isError(error: any): error is Error {
  return error && error.stack && error.message
}

function doLog(level: string, ...args: any[]): void {
  const strs = args.map((arg) =>
    typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)
  )

  let line = strs.join(' | ')

  // get the user email from the async local storage
  const store = asyncLocalStorage.getStore()
  const userEmail = store?.userData?.identifier

  const str = userEmail ? `(user: ${userEmail})` : 'unauthenticated'
  line = `${getTime()} - ${level} - ${line} ${str}\n`
  console.log(line)

  fs.appendFile('./logs/backend.log', line, (error) => {
    if (error) console.log('FATAL: cannot write to log file')
  })
}

export default {
  debug(...args: any[]) {
    if (process.env.NODE_ENV === 'production') return
    doLog('DEBUG', ...args)
  },
  info(...args: any[]) {
    doLog('INFO', ...args)
  },
  warn(...args: any[]) {
    doLog('WARN', ...args)
  },
  error(...args: any[]) {
    doLog('ERROR', ...args)
  },
}

import fs from 'fs'
import { getPublicIdFromALS, getUuidFromALS } from './als.service'

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

  // get the publicId from the async local storage
  let publicId
  try {
    publicId = getPublicIdFromALS() ?? 'No publicId'
  } catch (error) {}

  // get the user uuid from the async local storage
  let uuid
  try {
    uuid = getUuidFromALS() ?? 'No userId'
  } catch (error) {}

  const uuidStr = uuid ? `(user: ${uuid})` : 'unauthenticated'
  const publicIdStr = publicId ? `(publicId: ${publicId})` : 'unauthenticated'
  line = `${getTime()} - ${level} - ${publicIdStr} - ${uuidStr} \n ${line}`
  console.log(line)

  fs.appendFile('./logs/backend.log', line, (error) => {
    if (error) console.log('FATAL: cannot write to log file')
  })
}

const logger = {
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

export default logger

// log object example:
//
// logger.info(
//   `accountService - setProfile, account: ${JSON.stringify(
//     account,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )

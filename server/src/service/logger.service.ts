import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import asyncLocalStorage from './als.service'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// define the time format
function getTime(): string {
  const now = new Date()
  return now.toLocaleString('he')
}

function isError(e: any): e is Error {
  return e && e.stack && e.message
}

function doLog(level: string, ...args: any[]): void {
  const strs = args.map((arg) =>
    typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)
  )

  let line = strs.join(' | ')
  const store = asyncLocalStorage.getStore()
  const userId = store?.loggedinUser?._id
  const str = userId ? `(userId: ${userId})` : ''
  line = `${getTime()} - ${level} - ${line} ${str}\n`
  console.log(line)
  fs.appendFile('./logs/backend.log', line, (err) => {
    if (err) console.log('FATAL: cannot write to log file')
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

import fs from 'fs';
import { asyncLocalStorage } from './als.service.js';
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}
// define the time format
function getTime() {
    const now = new Date();
    return now.toLocaleString('he');
}
function isError(error) {
    return error && error.stack && error.message;
}
function doLog(level, ...args) {
    const strs = args.map((arg) => typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg));
    let line = strs.join(' | ');
    // get the user identifier from the async local storage
    const store = asyncLocalStorage.getStore();
    const identifier = store?.userData?.identifier;
    const str = identifier ? `(user: ${identifier})` : 'unauthenticated';
    line = `${getTime()} - ${level} - ${str}- ${line}`;
    console.log(line);
    fs.appendFile('./logs/backend.log', line, (error) => {
        if (error)
            console.log('FATAL: cannot write to log file');
    });
}
const logger = {
    debug(...args) {
        if (process.env.NODE_ENV === 'production')
            return;
        doLog('DEBUG', ...args);
    },
    info(...args) {
        doLog('INFO', ...args);
    },
    warn(...args) {
        doLog('WARN', ...args);
    },
    error(...args) {
        doLog('ERROR', ...args);
    },
};
export default logger;
// log object example:
//
// logger.info(
//   `accountService - setProfile, account: ${JSON.stringify(
//     account,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
//# sourceMappingURL=logger.service.js.map
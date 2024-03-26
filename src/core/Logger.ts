import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { environment, logDirectory } from '../config/envVar';
import { EMOJIS } from '../constants/emojis';

const logLevel = environment === 'development' ? 'debug' : 'warn';

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const consoleFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    let emoji = '';
    let logLevel = level.toUpperCase(); // Default log level without color

    switch (level) {
      case 'info':
        emoji = EMOJIS.INFO;
        logLevel = `\x1b[36m${logLevel}\x1b[0m`; // Cyan color
        break;
      case 'debug':
        emoji = EMOJIS.NOTEBOOK;
        logLevel = `\x1b[34m${logLevel}\x1b[0m`; // Blue color
        break;
      case 'warn':
        emoji = EMOJIS.WARNNING;
        logLevel = `\x1b[33m${logLevel}\x1b[0m`; // Yellow color
        break;
      case 'error':
        emoji = EMOJIS.NO_ENTRY;
        logLevel = `\x1b[31m${logLevel}\x1b[0m`; // Red color
        break;
      default:
        emoji = '';
        break;
    }

    return `[${timestamp}] ${logLevel} ${emoji} \t${message}`;
  }),
);

const options = {
  file: {
    level: logLevel,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    maxFiles: '14d',
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: consoleFormat,
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false,
  silent: environment === 'test' ? true : false,
});

// src/libs/logger/index.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Create a daily rotating file transport
const dailyRotateFileTransport = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: path.join(__dirname, '..', '..', '..', 'logs'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '21m', // Limit each log file to 21 MB
  maxFiles: '30d', // Keep logs for 30 days
  zippedArchive: true, // Compress old log files
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    dailyRotateFileTransport,
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
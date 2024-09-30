import winston from 'winston';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

// Helper function to delete old logs
const deleteOldLogs = (logDirectory: string, maxAgeInDays: number) => {
    const files = fs.readdirSync(logDirectory);

    files.forEach((file) => {
        const filePath = path.join(logDirectory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory() && moment(file, 'YYYY-MM-DD', true).isValid()) {
            const folderDate = moment(file, 'YYYY-MM-DD');
            const currentDate = moment();
            const ageInDays = currentDate.diff(folderDate, 'days');

            if (ageInDays > maxAgeInDays) {
                fs.rmSync(filePath, { recursive: true, force: true });
                console.log(`Deleted old log folder: ${filePath}`);
            }
        }
    });
};

class TimestampFirst {
    enabled: boolean;

    constructor(enabled: boolean = true) {
        this.enabled = enabled;
    }

    transform(info: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo {
        if (this.enabled) {
            return { ...info, timestamp: info.timestamp };
        }
        return info;
    }
}

const logDir = `./logs/${moment().format('YYYY-MM-DD')}`;

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Automatically delete logs older than 30 days
deleteOldLogs('./logs', 30);

const infoFilter = winston.format((info) => {
    return info.level === 'info' ? info : false;
});

const errorFilter = winston.format((info) => {
    return info.level === 'error' ? info : false;
});

const myFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format((info) => new TimestampFirst(true).transform(info))(),
    winston.format.json()
);

const logger = winston.createLogger({
    format: myFormat,
    transports: [
        // Error log
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            format: winston.format.combine(errorFilter(), myFormat),
            level: 'error',
        }),
        // Info log
        new winston.transports.File({
            filename: path.join(logDir, 'info.log'),
            format: winston.format.combine(infoFilter(), myFormat),
            level: 'info',
        }),
    ],
});

// Console transport for development environments
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     );
// }

export default logger;

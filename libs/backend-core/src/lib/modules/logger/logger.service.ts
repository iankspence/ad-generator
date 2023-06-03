import { Logger, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })  // The TRANSIENT scope means a new instance will be created for each injection
export class LoggerService extends Logger {
    context?: string;
    private logger: winston.Logger;

    constructor() {
        super();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ level, message, label, timestamp }) => {
                    return `${timestamp} [${label}] ${level}: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        });
    }

    setContext(context: string) {
        this.context = context;
        this.logger.format = winston.format.combine(
            winston.format.label({ label: context }),
            winston.format.timestamp(),
            winston.format.printf(({ level, message, label, timestamp }) => {
                return `${timestamp} [${label}] ${level}: ${message}`;
            })
        );
    }

    log(message: string) {
        super.log(message);
        this.logger.info(message);
    }

    error(message: string, trace: string) {
        super.error(message, trace);
        this.logger.error(message);
    }

    warn(message: string) {
        super.warn(message);
        this.logger.warn(message);
    }

    debug(message: string) {
        super.debug(message);
        this.logger.debug(message);
    }

    verbose(message: string) {
        super.verbose(message);
        this.logger.verbose(message);
    }
}

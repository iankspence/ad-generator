import { Logger, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    context?: string;
    private logger: winston.Logger;
    private env: string;

    constructor() {
        super();
        this.env = (process.env.CONFIG_ENV || 'local').toUpperCase();

        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ level, message, label, timestamp }) => {
                    return `${timestamp} [${this.env}][${label}] ${level}: ${message}`;
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
                return `${timestamp} [${this.env}][${label}] ${level}: ${message}`;
            })
        );
    }

    log(message: string) {
        super.log(message);
        this.logger.info(message);
    }

    error(message: string, trace?: string) {
        super.error(message, trace);
        this.logger.error(trace ? `${message} - ${trace}` : message);
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

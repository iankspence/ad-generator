import { Logger, Injectable, Scope } from '@nestjs/common';
import { Logtail } from "@logtail/node";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    context?: string;
    private env: string;
    private logtail: Logtail;

    constructor() {
        super();
        this.env = (process.env.CONFIG_ENV || 'local').toUpperCase();
        this.logtail = new Logtail(process.env.LOG_SOURCE_TOKEN);
    }

    setContext(context: string) {
        this.context = context;
    }

    setMessageEnv(level: string, message: string) {
        return `[${this.env}] - ${message}`
    }

    async log(message: string) {
        super.log(this.setMessageEnv('LOG', message));
    }

    async error(message: string, trace?: string) {
        super.error(this.setMessageEnv('ERROR', message), trace);
    }

    async warn(message: string) {
        super.warn(this.setMessageEnv('WARN', message));
    }

    async debug(message: string) {
        super.debug(this.setMessageEnv('DEBUG', message));
    }

    async verbose(message: string) {
        super.verbose(this.setMessageEnv('VERBOSE', message));
    }
}

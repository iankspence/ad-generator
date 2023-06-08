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

    async log(message: string) {
        super.log(message);
        await this.logtail.log(message, 'LOG', {level: 'LOG',  env: this.env, context: this.context});
    }

    async error(message: string, trace?: string) {
        super.error(message, trace);
        await this.logtail.error(message, {level: 'ERROR', env: this.env, context: this.context});
    }

    async warn(message: string) {
        super.warn(message);
        await this.logtail.warn(message, {level: 'WARN', env: this.env, context: this.context});
    }

    async debug(message: string) {
        super.debug(message);
        await this.logtail.debug(message, {level: 'DEBUG', env: this.env, context: this.context});
    }

    async verbose(message: string) {
        super.verbose(message);
        await this.logtail.info(message, {level: 'VERBOSE', env: this.env, context: this.context});
    }
}

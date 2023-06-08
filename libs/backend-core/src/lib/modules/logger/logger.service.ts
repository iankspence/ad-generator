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

    log(message: string) {
        super.log(message);
        this.logtail.log(message, 'LOG', {level: 'LOG', context: this.context}).catch(err => super.error(err));
    }

    error(message: string, trace?: string) {
        super.error(message, trace);
        this.logtail.error(message, {level: 'ERROR', context: this.context}).catch(err => super.error(err));
    }

    warn(message: string) {
        super.warn(message);
        this.logtail.warn(message, {level: 'WARN', context: this.context}).catch(err => super.error(err));
    }

    debug(message: string) {
        super.debug(message);
        this.logtail.debug(message, {level: 'DEBUG', context: this.context}).catch(err => super.error(err));
    }

    verbose(message: string) {
        super.verbose(message);
        this.logtail.info(message, {level: 'VERBOSE', context: this.context}).catch(err => super.error(err));
    }
}

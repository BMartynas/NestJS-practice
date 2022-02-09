import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
    private logCounter = 0;

    log(message: any, ...optionalParams: any[]) {
        this.logCounter++;
        super.log('Number of times log method was called: ' + this.logCounter);
        super.log(message);
    }
}


import { InjectionToken } from '@angular/core';

export const LOGGER_PREFIX = new InjectionToken<string>('LOGGER_PREFIX');

export abstract class Logger {
  abstract log(message: string): void;
}

export class ConsoleLogger implements Logger {
  constructor(private readonly prefix: string) {}

  log(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
}

export class VerboseLogger implements Logger {
  constructor(private readonly prefix: string) {}

  log(message: string): void {
    console.log(`[${this.prefix}] ${new Date().toISOString()} ${message}`);
  }
}

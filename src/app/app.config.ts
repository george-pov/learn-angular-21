import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { APP_BUILD_LABEL, STORAGE_KEY } from './app-tokens';
import { routes } from './app.routes';
import { ConsoleLogger, Logger, LOGGER_PREFIX } from './logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: STORAGE_KEY, useValue: 'learn-angular-22-topics' },
    { provide: LOGGER_PREFIX, useValue: 'app' },
    {
      provide: Logger,
      useFactory: (prefix: string) => new ConsoleLogger(prefix),
      deps: [LOGGER_PREFIX],
    },
    {
      provide: APP_BUILD_LABEL,
      useFactory: () => `built-at-${new Date().toISOString()}`,
    },
  ],
};

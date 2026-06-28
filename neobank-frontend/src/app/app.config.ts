import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withRouterConfig,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from './interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    // ✅ Global error handling
    provideBrowserGlobalErrorListeners(),

    // ✅ Router with scroll restoration + page transitions
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withViewTransitions()
    ),

    // ✅ HttpClient
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ JWT interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
};

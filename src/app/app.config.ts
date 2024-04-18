import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import {
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { requestInterceptor } from './core/interceptor/request.interceptor';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(withInterceptors([requestInterceptor])),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, ActionReducer, MetaReducer } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as fromAuth from '@my-deskbird-app/features/authentication';
import * as fromUsersStore from '@my-deskbird-app/features/user-management';

import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth', 'users'], rehydrate: true })(
    reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      {
        [fromAuth.AUTH_FEATURE_KEY]: fromAuth.authReducer,
        [fromUsersStore.USERS_FEATURE_KEY]: fromUsersStore.usersReducer,
      },
      {
        runtimeChecks: {},
        metaReducers: metaReducers,
      }
    ),
    provideEffects([fromAuth.AuthEffects, fromUsersStore.UsersEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};

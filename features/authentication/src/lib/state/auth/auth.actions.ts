import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const initAuth = createAction(
  '[Auth Page] Init Login',
  props<{ password: string; user: string }>()
);

export const loadAuthSuccess = createAction(
  '[Auth/API] Login Auth Success',
  props<{ auth: AuthEntity }>()
);

export const loadAuthFailure = createAction(
  '[Auth/API] Login Auth Failure',
  props<{ error: any }>()
);

export const logoutAuth = createAction('[Auth Page] Init Logout');

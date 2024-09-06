import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
  isUserAuth: boolean;
  user: AuthEntity | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  // set initial required properties
  loaded: true,
  isUserAuth: false,
  error: null,
  user: null,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.initAuth, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AuthActions.loadAuthSuccess, (state, { auth }) => ({
    ...state,
    loaded: true,
    error: null,
    user: auth,
    isUserAuth: true,
  })),
  on(AuthActions.logoutAuth, (state) => ({
    ...state,
    loaded: true,
    error: null,
    user: null,
    isUserAuth: false,
  })),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

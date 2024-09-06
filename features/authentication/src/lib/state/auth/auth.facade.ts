import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(AuthSelectors.selectAuthLoaded));
  error$ = this.store.pipe(select(AuthSelectors.selectAuthError));
  isAuth$ = this.store.pipe(select(AuthSelectors.selectAuthed));
  currentUser$ = this.store.pipe(select(AuthSelectors.selectAuthCurrentUser));

  login(username: string, password: string) {
    this.store.dispatch(
      AuthActions.initAuth({ user: username, password: password })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logoutAuth());
  }
}

import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { UsersEntity } from './users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  addUser(user: UsersEntity) {
    this.store.dispatch(UsersActions.addUser({ user }));
  }

  changeUser(user: UsersEntity) {
    this.store.dispatch(UsersActions.updateUser({ user }));
  }
}

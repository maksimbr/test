import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const initUsers = createAction('[Users Page] Init');
export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: UsersEntity[] }>()
);
export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>()
);
export const addUser = createAction(
  '[Users/API] Add User',
  props<{ user: UsersEntity }>()
);
export const addUserSuccess = createAction(
  '[Users/API] Add User Success',
  props<{ user: UsersEntity }>()
);
export const addUserFailure = createAction(
  '[Users/API] Add User Failure',
  props<{ error: any }>()
);
export const updateUser = createAction(
  '[Users/API] Update User',
  props<{ user: UsersEntity }>()
);
export const updateUserSuccess = createAction(
  '[Users/API] Update User Success',
  props<{ user: UsersEntity }>()
);
export const updateUserFailure = createAction(
  '[Users/API] Update User Failure',
  props<{ error: any }>()
);

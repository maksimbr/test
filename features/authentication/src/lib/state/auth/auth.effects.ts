import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.initAuth),
      switchMap(({ user, password }) =>
        this.authenticationService
          .login(user as string, password as string)
          .pipe(
            map(({ role }) => {
              const userEntity = {
                id: 1,
                name: user,
                role,
              };

              return AuthActions.loadAuthSuccess({ auth: userEntity });
            }),
            catchError((error) => {
              console.error('Error', error);
              return of(AuthActions.loadAuthFailure({ error }));
            })
          )
      )
    );
  });

  loadAuthSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loadAuthSuccess),
        tap(() => {
          this.router.navigate(['/users']);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutAuth),
        switchMap(() =>
          this.authenticationService.logout().pipe(
            tap(() => this.router.navigate(['/auth'])),
            catchError((error) => {
              console.error('Error', error);
              return of(AuthActions.loadAuthFailure({ error }));
            })
          )
        )
      ),
    { dispatch: false }
  );
}

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { UserRole } from './auth.models';

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: AuthActions.initAuth({ user: 'Maks', password: '1234' }),
      });

      const expected = hot('-a-|', {
        a: AuthActions.loadAuthSuccess({
          auth: { name: 'Maks', role: UserRole.USER, id: 1 },
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

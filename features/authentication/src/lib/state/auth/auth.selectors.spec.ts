import { AuthEntity, UserRole } from './auth.models';
import { AuthPartialState, initialAuthState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let state: AuthPartialState;

  beforeEach(() => {
    state = {
      auth: {
        ...initialAuthState,
        error: ERROR_MSG,
        loaded: true,
        user: {
          id: 2,
          name: 'Maks',
          role: UserRole.ADMIN,
        },
      },
    };
  });

  describe('Auth Selectors', () => {
    it('selectAuthLoaded() should return the current "loaded" status', () => {
      const result = AuthSelectors.selectAuthLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAuthError() should return the current "error" state', () => {
      const result = AuthSelectors.selectAuthError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

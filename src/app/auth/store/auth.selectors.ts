import {createSelector} from '@ngrx/store';
import {AuthState} from '@app/auth/store/auth.reducer';

export const selectorAuth = (state): AuthState => state['core:auth:constantine'];
export const selectorAuthSignup = (state): AuthState => state.auth.main.signup;
export const selectorConnectedUser = createSelector(
  selectorAuth,
  (authState: AuthState) => {
    return authState.user;
  }
);

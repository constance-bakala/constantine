import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@app/auth/store/auth.reducer';

export const selectorAuth = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectorAuth,
  (authState: AuthState) => {
    return authState.user;
  }
);

export const selectLoading = createSelector(
  selectorAuth,
  (authState: AuthState) => authState.loading
);

export const selectError = createSelector(
  selectorAuth,
  (authState: AuthState) => authState.error
);

// Backward compatibility aliases
export const selectorAuthSignup = selectorAuth;
export const selectorConnectedUser = selectUser;
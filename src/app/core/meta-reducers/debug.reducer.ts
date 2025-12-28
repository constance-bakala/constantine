import {ActionReducer} from '@ngrx/store';
import {environment} from '@env/environment';

const shouldLog = !!(environment.redux && environment.redux.log);

// Optionnel : whitelist d’actions (vide = tout loguer)
const whitelist: string[] = [];

/**
 * Meta-reducer de debug : log les actions et le state.
 * Compatible NgRx 13+ (et au-delà), sans dépendance externe.
 */
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  if (!shouldLog) {
    return reducer;
  }

  return (state, action) => {
    // Filtrage optionnel
    if (whitelist.length && !whitelist.includes(action.type)) {
      return reducer(state, action);
    }

    // Groupe pour un affichage propre dans la console
    // eslint-disable-next-line no-console
    console.groupCollapsed(`[NgRx] ${action.type}`);
    // eslint-disable-next-line no-console
    console.log('action', action);
    // eslint-disable-next-line no-console
    console.log('prev state', state);

    const nextState = reducer(state, action);

    // eslint-disable-next-line no-console
    console.log('next state', nextState);
    // eslint-disable-next-line no-console
    console.groupEnd();

    return nextState;
  };
}

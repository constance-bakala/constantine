import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '@env/environment';

const opts =
  environment.redux && environment.redux.log
    ? {}
    : {
        filter: {
          whitelist: []
        }
      };

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return storeLogger(opts)(reducer);
}

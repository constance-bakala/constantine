import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';

@Injectable()
export class BasketEffects {
  constructor(private actions$: Actions<Action>,
              private store$: Store<any>) {
  }
}

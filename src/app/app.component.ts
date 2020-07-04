import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {routerTransition} from '@app/core';
import {Store} from '@ngrx/store';
import {ActionAuthLoggedIn, ActionAuthLoggedOut, AuthRefreshUserToken} from '@app/auth/store/auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';
import {initLoginPayload} from '@helpers/common.services.utils';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent {
  title = 'Délice éternel';

  constructor(
    private router: Router, private db: AngularFirestore, private store: Store<any>) {
    const users$ = this.db.collection('users').valueChanges();
    users$.subscribe(users => {
        //console.log(users);
      });
    users$.pipe();

    this.store.dispatch(new AuthRefreshUserToken());
  }


}

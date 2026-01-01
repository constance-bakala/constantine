import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {collection, collectionData, collectionSnapshots, Firestore} from '@angular/fire/firestore';
import { routerTransition } from '@app/core';
import { Store } from '@ngrx/store';
import { AuthRefreshUserToken } from '@app/auth/store/auth.actions';
import { Auth } from '@angular/fire/auth';
import { ItemsCategoriesEnum } from '@shared/interfaces';
import { ActionItemsRetrieve } from '@app/features/store';
import { TranslateService } from '@ngx-translate/core';
import {catchError, map, Observable, of} from 'rxjs';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { environment } from '@env/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Délice éternel';

  users$!: Observable<any[]>;

  constructor(
    private router: Router,
    private firestore: Firestore,
    public auth: Auth,
    private store: Store<any>,
    public translate: TranslateService
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    const usersRef = collection(this.firestore, 'users');
    this.users$ = collectionData(usersRef, { idField: 'id' });

    collectionSnapshots(usersRef).pipe(
      map(snaps => snaps.map(s => ({ id: s.id, ...(s.data() as any) }))),
      catchError(err => {
        console.error('users$ error', err);
        return of([] as any[]);
      })
    ).subscribe();

    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthRefreshUserToken());

    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.MASKS }));
    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.DRESSES }));
    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.EARINGS }));
  }
}

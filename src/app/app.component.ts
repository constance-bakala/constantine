import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {routerTransition} from '@app/core';
import {Store} from '@ngrx/store';
import {AuthRefreshUserToken} from '@app/auth/store/auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';
import {ItemsCategoriesEnum} from '@shared/interfaces';
import {ActionItemsRetrieve} from '@app/features/store';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  title = 'Délice éternel';

  constructor(
    private router: Router, private db: AngularFirestore, private store: Store<any>, public afAuth: AngularFireAuth,
    public translate: TranslateService) {
    const users$ = this.db.collection('users').valueChanges();
    users$.subscribe(users => {
      //console.log(users);
    });
    users$.pipe();

    // the lang to use, if the lang isn't available, it will use the current loader to get them

  }

  ngOnInit(): void {
    this.store.dispatch(new AuthRefreshUserToken());

    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.MASKS}));

    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.DRESSES}));

    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.EARINGS}));
  }



}

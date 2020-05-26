import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {routerTransition} from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent {
  title = 'Délice éternel';

  constructor(
    private router: Router, private db: AngularFirestore) {
    const users$ = this.db.collection('users').valueChanges();
    users$.subscribe(users => {
        console.log(users);
      });
    users$.pipe(
    )
  }
}

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';

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

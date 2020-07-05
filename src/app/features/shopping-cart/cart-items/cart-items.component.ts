import {Component, Inject, OnInit} from '@angular/core';
import {
  ActionItemToogleNotSelected,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectNbChosenItems
} from '@app/features/store';
import {ItemInfos} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireFunctions} from '@angular/fire/functions';
import * as firebase from 'firebase/app';
import {MatDialog} from '@angular/material/dialog';
import {AngularFireDatabase} from '@angular/fire/database';
import {Go} from '@app/auth/store';
import {AlertComponent} from '@shared/components/alert/alert.component';
import {DataSnapshot} from '@angular/fire/database/interfaces';
import {compareObjects} from '@helpers/compare.objects.utils';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IAppConfig} from '@shared/interfaces/app.interfaces';
import {APP_CONFIG} from '@helpers/constants';
import {SnackAlertComponent} from '@shared/components/snack-alert/snack-alert.component';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  basketFormGroup: FormGroup;
  nbSelectedItems$: Observable<number>;
  sizes: {
    value: ItemSizeEnum;
    label: string;
  }[] = [{
    value: ItemSizeEnum.S,
    label: 'S'
  }, {
    value: ItemSizeEnum.M,
    label: 'M'
  }, {
    value: ItemSizeEnum.L,
    label: 'L'
  }, {
    value: ItemSizeEnum.XL,
    label: 'XL'
  }];

  items = [];
  userId = undefined;
  commendAllreadySent = false;
  private readonly snackDuration: number;


  constructor(private store: Store<any>,
              private fb: FormBuilder,
              public afAuth: AngularFireAuth,
              private fun: AngularFireFunctions,
              private db: AngularFireDatabase,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              @Inject(APP_CONFIG) appConfig: IAppConfig) {
    this.snackDuration = appConfig.snackDuration;
  }

  ngOnInit(): void {
    this.nbSelectedItems$ = this.store.pipe(
      select(selectNbChosenItems)
    );

    this.store.pipe(select(selectChosenItems))
      .subscribe((items: ItemInfos[]) => {
        if (!!items) {
          this.items = items;
          this.initFormArray(items);
        }
      });

    this.afAuth.authState.subscribe(user => {
      if (!!user && !!user.uid) {
        this.userId = user.uid;
        firebase.database().ref(`users/${user.uid}/commends`).on('value', (snap) => {
          let savedItems = this.getExistingItemsFromSnapShot(snap);
          if (!!savedItems) {
            savedItems.forEach(item => {
              this.store.dispatch(new ActionItemToogleNotSelected(item));
            });
          }
        });
      }
    });
  }

  private getExistingItemsFromSnapShot(snap: DataSnapshot): ItemInfos[] {
    let savedItems = undefined;
    if (!!snap.val()) {
      savedItems = Object.values(snap.val())[0] as ItemInfos[];
      if (!!savedItems) {
        if (!(savedItems instanceof Array)) {
          savedItems = [savedItems];
        }
      }
    }
    return savedItems;
  }


  get basketItemsArray(): FormArray {
    return this.basketFormGroup.get('basketItems') as FormArray;
  }

  initFormArray(items: ItemInfos[]) {
    this.basketFormGroup = this.fb.group({
      basketItems: this.fb.array([])
    });
    const basketItems = this.basketFormGroup.get('basketItems') as FormArray;
    items.forEach(item => {
      basketItems.push(this.initBasketItemGroup(item));
    });
  }

  initBasketItemGroup(itemInfos: ItemInfos): FormGroup {
    const group = this.fb.group({
      size: [itemInfos.basketInfos?.selectedSize ?? ItemSizeEnum.M, Validators.required],
      quantity: [itemInfos.basketInfos?.selectedQuantity, Validators.required],
      path: [itemInfos.path, Validators.required],
      selected: [itemInfos.selected, Validators.required],
      reference: [itemInfos.reference, Validators.required],
      index: [itemInfos.index, Validators.required],
      category: [itemInfos.category, Validators.required],
      model: [itemInfos.basketInfos?.selectedModel ?? '', Validators.required],
    });

    group.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(() => {
      this.store.dispatch(new ActionUpdateBasketItem(group.getRawValue()))
    });
    return group;
  }


  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  stepDown(index: number) {
    const value: number = this.getItemQuantity(index).value;
    if (value > 1) {
      this.getItemQuantity(index).patchValue(value - 1);
    } else {
      this.getItemQuantity(index).patchValue(1);
    }
  }

  stepUp(index: number) {
    const value: number = +this.getItemQuantity(index).value;
    if (value < 999) {
      this.getItemQuantity(index).patchValue(value + 1);
    } else {
      this.getItemQuantity(index).patchValue(1000);
    }
  }

  getItemQuantity(index: number): FormControl {
    return this.basketItemsArray.controls[index].get('quantity') as FormControl;

  }

  sendCommand() {
    if (!!firebase.auth().currentUser?.uid) {
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/commends`).on('value', (snap) => {
        let existingCommands = this.getExistingItemsFromSnapShot(snap);
        if (!!existingCommands) {
          // It is important to protect the mail option as we have a limited number of email per day!
          // The comparison bellow also avoid sending to much request to the firebase backend!
          if (!this.items || this.items.length < 1 || compareObjects(existingCommands, this.items)) {
           if(!this.commendAllreadySent) {
             let dialogRef = this.dialog.open(AlertComponent, {
               panelClass: 'signin-dialog',
               disableClose: false,
               minWidth: 300,
               autoFocus: true,
             });
             dialogRef.afterClosed().subscribe(
               () => {
                 dialogRef = undefined;
               }
             )
           }
          } else {

            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/commends`).set(null)
              .then(() => {
                this.commendAllreadySent = true;
                this.db.list(`users/${firebase.auth().currentUser.uid}/commends`).push(this.items);
                this.sendCommendNotificationMails(firebase.auth().currentUser);
                this.snackBar.openFromComponent(SnackAlertComponent,
                  {
                    duration: this.snackDuration,
                    politeness: 'polite'
                });
              });
          }
        }
      });
    } else {
      /*
      this.dialogRef = this.dialog.open(LoginComponent, {
        panelClass: 'signin-dialog',
        disableClose: false,
        autoFocus: true,
      });
      this.dialogRef.afterClose().subscribe(
        () => {
          this.dialogRef = undefined;
        }
      )*/
      this.store.dispatch(new Go({
        path: ['/auth/signin']
      }));
    }
  }

  private sendCommendNotificationMails(user: firebase.User) {
    const callable = this.fun.httpsCallable('genericSendgridEmail');
    const data = {
      text: '',
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
      subject: 'Nouvelle commande internet!',
      html: `Commande reçue: ` + JSON.stringify(this.items)
    };
    callable(data).subscribe(result => console.log(result));
  }


}

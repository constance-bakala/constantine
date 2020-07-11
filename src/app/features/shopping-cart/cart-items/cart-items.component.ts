import {Component, Inject, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {
  ActionItemToogleNotSelected,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectExistingCategory,
  selectNbChosenItems
} from '@app/features/store';
import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
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
import {selectorConnectedUser} from '@app/auth/store/auth.selectors';
import {environment} from '@env/environment';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';

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

  items: ItemInfos[] = [];
  userId = undefined;
  commendAllreadySent = false;
  private readonly snackDuration: number;
  ItemsCategoriesEnum = ItemsCategoriesEnum;

  @Input()
  categoryInfos$: Observable<ExistingCategories>;

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

    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));

    this.store.pipe(select(selectChosenItems))
      .subscribe((items: ItemInfos[]) => {
        if (!!items) {
          this.items = items;
          this.initFormArray(items);
        }
      });

    combineLatest([
      this.store.select(selectorConnectedUser, this.afAuth.authState)
        .pipe(
          filter(old => !!old),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))),
      this.afAuth.authState
        .pipe(
          filter(newConnected => !!newConnected),
          distinctUntilChanged((a, b) => a.uid === b.uid)),
    ])
      .pipe(map(([oldUser, newUser]) => {
        if (!!newUser?.uid) {
          this.userId = newUser.uid;
          firebase.database().ref(`users/${newUser.uid}/commends`).on('value', (snap) => {
            let savedItems = this.getExistingItemsFromSnapShot(snap);
            if (!!savedItems) {
              savedItems.forEach(item => {
                this.store.dispatch(new ActionItemToogleNotSelected(item));
              });
            }
          });
          if (newUser.uid && oldUser.additionalInfos.uid && newUser.uid !== oldUser.additionalInfos.uid && oldUser?.isAnonymous) {
            firebase.auth().currentUser.linkWithCredential(oldUser.credential)
              .then(userCred => console.log(userCred));
          }
        }
        return true
      })).subscribe();
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
        // Don't move this test away from here! because this block will be fired after each modification of the database!!!
        if (!this.commendAllreadySent) {
          let existingCommands = this.getExistingItemsFromSnapShot(snap);
          // It is important to protect the mail option as we have a limited number of email per day!
          // The comparison bellow also avoid sending to much request to the firebase backend!
          if (!this.items || this.items.length < 1 || (!!existingCommands && compareObjects(existingCommands, this.items))) {
            this.alertCommandNotSent('Cette commande existe déjà! Vous devez la mettre à jour pour la transmettre de nouveau!');
          } else {
            // We update commendAllreadySent to true to avoid firing the database value above a second time! => this setting should stay here!!
            this.commendAllreadySent = true;
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/commends`).set(null)
              .then(() => {
                this.db.list(`users/${firebase.auth().currentUser.uid}/commends`).push(this.items);
                if (!firebase.auth().currentUser?.isAnonymous) {
                  this.sendCommendNotificationMails(firebase.auth().currentUser);
                  this.snackBar.openFromComponent(SnackAlertComponent,
                    {
                      duration: this.snackDuration,
                      politeness: 'polite',
                    });
                } else {
                  this.alertCommandNotSent('Vous devez être authentifié pour envoyer une commande!');
                }
              });
          }
        }
      });
    } else {
      firebase.auth().signInAnonymously()
        .then(user => {
          if (user) {
            this.sendCommand();
          } else {
            this.store.dispatch(new Go({
              path: ['/auth/signin']
            }));
          }
        });
    }
  }

  private alertCommandNotSent(message: string) {
    let dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'signin-dialog',
      disableClose: false,
      minWidth: 300,
      autoFocus: true,
      data: {
        disableClose: false,
        title: 'Commande non envoyée',
        message: message,
      }
    });
    dialogRef.afterClosed().subscribe(
      () => {
        dialogRef = undefined;
      }
    );
  }

  private sendCommendNotificationMails(user: firebase.User) {
    const protocol = window.location.protocol;
    let prefix = protocol + '//' + window.location.host;
    if (prefix.indexOf('gitHub') > 0) {
      prefix = prefix + environment.appId;
    }
    const emailData = _.cloneDeep(this.items).map(item => {
      item.path = prefix + '/' + item.path;
      delete item.loading;
      delete item.selected;
      delete item.index;
      return item;
    });
    const data = {
      text: '',
      displayName: user.displayName,
      shoppingCardLink: prefix + "/#/shopping-cart",
      uid: user.uid,
      subject: 'Commande Délice Éternel!',
      items: emailData
    };
    this.fun.httpsCallable('genericSendgridEmail')(data)
      .subscribe(result => console.log(result),
        error => console.log(error));
  }


  gotoTarget(name: string) {
    this.store.dispatch(new Go({path: ['/' + name]}));
  }
}

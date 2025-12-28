import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {select, Store} from '@ngrx/store';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

import {
  ActionItemToogleNotSelected,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectExistingCategory,
  selectNbChosenItems,
} from '@app/features/store';

import {ITEM_SIZES, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireFunctions} from '@angular/fire/compat/functions';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import {MatDialog} from '@angular/material/dialog';
import {Go} from '@app/auth/store';
import {AlertComponent} from '@shared/components/alert/alert.component';
import {compareObjects} from '@helpers/compare.objects.utils';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IAppConfig} from '@shared/interfaces/app.interfaces';
import {APP_CONFIG, DEFAULT_LOCALE_ID} from '@helpers/constants';
import {SnackAlertComponent} from '@shared/components/snack-alert/snack-alert.component';
import {selectorConnectedUser} from '@app/auth/store/auth.selectors';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';
import { Store as NgRxStore } from '@ngrx/store';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'], // ✅ corrigé (scss)
})
export class CartItemsComponent implements OnInit, OnDestroy {
  basketFormGroup!: UntypedFormGroup;
  nbSelectedItems$!: Observable<number>;
  sizes = ITEM_SIZES;

  items: ItemInfos[] = [];
  userId: string | undefined;
  commendAllreadySent = false;
  private readonly snackDuration: number;

  ItemsCategoriesEnum = ItemsCategoriesEnum;

  @Input()
  categoryInfos$!: Observable<ExistingCategories>;

  private subs = new Subscription();
  private commendsRef?: firebase.database.Reference;

  constructor(
    private store: NgRxStore<any>,
    private fb: UntypedFormBuilder,
    public afAuth: AngularFireAuth,
    private fun: AngularFireFunctions,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    @Inject(APP_CONFIG) appConfig: IAppConfig
  ) {
    this.snackDuration = appConfig.snackDuration;
  }

  ngOnInit(): void {
    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));

    // Form init
    this.basketFormGroup = this.fb.group({
      basketItems: this.fb.array([]),
    });

    // Items store -> form
    this.subs.add(
      this.store.pipe(select(selectChosenItems)).subscribe((items: ItemInfos[]) => {
        if (items) {
          this.items = items;
          this.initFormArray(items);
        }
      })
    );

    // Connexion user (store) + authState (firebase)
    // Connexion user (store) + authState (firebase)
    const authState$ = this.afAuth.authState as Observable<firebase.User | null>;

    this.subs.add(
      combineLatest([
        this.store.select(selectorConnectedUser) as Observable<any>,
        authState$
      ])
        .pipe(
          filter(([oldUser, newUser]) => !!oldUser && !!newUser),

          map(([oldUser, newUser]) => [oldUser, newUser as firebase.User] as const),

          distinctUntilChanged(([aOld, aNew], [bOld, bNew]) => {
            return (
              aOld?.additionalInfos?.uid === bOld?.additionalInfos?.uid &&
              aNew?.uid === bNew?.uid
            );
          }),

          map(([oldUser, newUser]) => {
            if (!newUser?.uid) return;

            this.userId = newUser.uid;

            this.detachCommendsListener();
            this.commendsRef = firebase.database().ref(`users/${newUser.uid}/commends`);
            this.commendsRef.on('value', (snap) => {
              const savedItems = this.getExistingItemsFromSnapShot(snap);
              if (savedItems?.length) {
                savedItems.forEach((item) => this.store.dispatch(new ActionItemToogleNotSelected(item)));
              }
            });

            if (
              newUser.uid &&
              oldUser?.additionalInfos?.uid &&
              newUser.uid !== oldUser.additionalInfos.uid &&
              oldUser?.isAnonymous &&
              oldUser?.credential
            ) {
              firebase
                .auth()
                .currentUser?.linkWithCredential(oldUser.credential)
                .then((userCred) => console.log('[linkWithCredential]', userCred))
                .catch((e) => console.error('[linkWithCredential]', e));
            }
          })
        )
        .subscribe()
    );

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.detachCommendsListener();
  }

  private detachCommendsListener(): void {
    if (this.commendsRef) {
      this.commendsRef.off();
      this.commendsRef = undefined;
    }
  }

  private getExistingItemsFromSnapShot(snap: firebase.database.DataSnapshot): ItemInfos[] {
    let savedItems: any = undefined;

    const val = snap.val();
    if (val) {
      // val peut être { pushId: items } -> on prend le 1er
      savedItems = Object.values(val)[0] as any;
      if (savedItems && !(savedItems instanceof Array)) {
        savedItems = [savedItems];
      }
    }

    return savedItems;
  }

  get basketItemsArray(): UntypedFormArray {
    return this.basketFormGroup.get('basketItems') as UntypedFormArray;
  }

  initFormArray(items: ItemInfos[]) {
    this.basketFormGroup.setControl('basketItems', this.fb.array([]));
    const basketItems = this.basketItemsArray;

    items.forEach((item) => basketItems.push(this.initBasketItemGroup(item)));
  }

  initBasketItemGroup(itemInfos: ItemInfos): UntypedFormGroup {
    const group = this.fb.group({
      size: [itemInfos.basketInfos?.selectedSize ?? ItemSizeEnum.M, Validators.required],
      quantity: [itemInfos.basketInfos?.selectedQuantity ?? 1, [Validators.required, Validators.min(1)]],
      model: [itemInfos.basketInfos?.selectedModel ?? '', Validators.required],
      path: [itemInfos.path, Validators.required],
      selected: [itemInfos.selected, Validators.required],
      reference: [itemInfos.reference, Validators.required],
      index: [itemInfos.index, Validators.required],
      category: [itemInfos.category, Validators.required],
    });

    this.subs.add(
      group.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe(() => {
          const updated: any = {
            ...group.getRawValue(),
            basketInfos: {
              selectedQuantity: group.get('quantity')?.value,
              selectedSize: group.get('size')?.value,
              selectedModel: group.get('model')?.value,
            },
          };

          delete updated.size;
          delete updated.quantity;
          delete updated.model;

          this.store.dispatch(new ActionUpdateBasketItem(updated));
        })
    );

    return group;
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  stepDown(index: number) {
    const value: number = Number(this.getItemQuantity(index).value);
    this.getItemQuantity(index).patchValue(Math.max(1, value - 1));
  }

  stepUp(index: number) {
    const value: number = Number(this.getItemQuantity(index).value);
    this.getItemQuantity(index).patchValue(Math.min(1000, value + 1));
  }

  getItemQuantity(index: number): UntypedFormControl {
    return this.basketItemsArray.controls[index].get('quantity') as UntypedFormControl;
  }

  sendCommand() {
    const currentUser = firebase.auth().currentUser;

    if (currentUser?.uid) {
      const commendsPath = `users/${currentUser.uid}/commends`;
      const ref = firebase.database().ref(commendsPath);

      // ✅ Lecture unique : évite d’empiler des listeners à chaque clic
      ref
        .once('value')
        .then((snap) => {
          if (this.commendAllreadySent) return;

          const existingCommands = this.getExistingItemsFromSnapShot(snap);

          if (!this.items || this.items.length < 1 || (existingCommands && compareObjects(existingCommands, this.items))) {
            this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
            return;
          }

          this.commendAllreadySent = true;

          return ref.set(null).then(() => {
            return ref.push(this.items).then(() => {
              if (!currentUser.isAnonymous) {
                this.sendCommendNotificationMails(currentUser);
                this.snackBar.openFromComponent(SnackAlertComponent, {
                  duration: this.snackDuration,
                  politeness: 'polite',
                });
              } else {
                this.alertCommandNotSent(this.translateService.instant('AUTHENTICATION_REQUIRED'));
              }
            });
          });
        })
        .catch((e) => {
          console.error(e);
          this.commendAllreadySent = false;
        });
    } else {
      firebase
        .auth()
        .signInAnonymously()
        .then((userCred) => {
          if (userCred?.user) {
            this.sendCommand();
          } else {
            this.store.dispatch(new Go({path: ['/auth/signin']}));
          }
        })
        .catch((e) => console.error(e));
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
        title: this.translateService.instant('COMMAND_NOT_SENT'),
        message,
      },
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(() => {
        dialogRef = undefined as any;
      })
    );
  }

  private sendCommendNotificationMails(user: firebase.User) {
    const protocol = window.location.protocol;
    let prefix = protocol + '//' + window.location.host;
    if (prefix.indexOf('github') > 0) {
      prefix = prefix + '/' + environment.appId;
    }

    const emailData = _.cloneDeep(this.items).map((item) => {
      item.path = prefix + '/' + item.path;
      delete (item as any).loading;
      delete (item as any).selected;
      delete (item as any).index;
      return item;
    });

    const data = {
      text: '',
      shoppingCardLink: prefix + '/#/shopping-cart',
      uid: user.uid,
      subject: this.translateService.instant('NEW_ORDER_TITLE', DEFAULT_LOCALE_ID),
      items: emailData,
      displayName: user.displayName,
    };

    this.fun.httpsCallable('genericSendgridEmail')(data).subscribe(
      (result) => console.log(result),
      (error) => console.log(error)
    );
  }

  gotoTarget(name: string) {
    this.store.dispatch(new Go({path: ['/' + name]}));
  }

  reload() {
    window.location.reload();
  }
}

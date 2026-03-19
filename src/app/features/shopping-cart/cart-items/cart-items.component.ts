import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { select, Store as NgRxStore } from '@ngrx/store';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, from, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


import {
  ActionItemsRetrieve,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectExistingCategory,
  selectNbChosenItems,
} from '@app/features/store';

import { ITEM_SIZES, ItemInfos, ItemsCategoriesEnum } from '@shared/interfaces';
import { ExistingCategories } from '@shared/components/portfolio-list/portfolio-list.component';

import { Functions, httpsCallable } from '@angular/fire/functions';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import { MatDialog } from '@angular/material/dialog';
import { Go } from '@app/auth/store';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { compareObjects } from '@helpers/compare.objects.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAppConfig } from '@shared/interfaces/app.interfaces';
import { APP_CONFIG } from '@helpers/constants';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';
import { selectorConnectedUser } from '@app/auth/store/auth.selectors';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { PricingService } from '@shared/services/pricing.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  standalone: false,
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

  currentCurrency = this.pricing.currency;

  private subs = new Subscription();
  private formSubs = new Subscription();
  private commendsRef?: firebase.database.Reference;

  constructor(
    private store: NgRxStore<any>,
    private fb: UntypedFormBuilder,
    private fun: Functions,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    public pricing: PricingService,
    @Inject(APP_CONFIG) appConfig: IAppConfig
  ) {
    this.snackDuration = appConfig.snackDuration;
  }

  ngOnInit(): void {
    this.subs.add(this.pricing.currency$.subscribe(c => { this.currentCurrency = c; }));

    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));

    // Charge toutes les catégories si on arrive directement sur le panier (ex: refresh),
    // ce qui déclenche restoreBasket$ via RETRIEVE_ITEMS_SUCCESS.
    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.MASKS }));
    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.DRESSES }));
    this.store.dispatch(new ActionItemsRetrieve({ category: ItemsCategoriesEnum.EARINGS }));

    // Form init
    this.basketFormGroup = this.fb.group({
      basketItems: this.fb.array([]),
    });

    // Items store -> form
    // distinctUntilChanged avec comparaison profonde : évite de reconstruire le form
    // si Firebase basket renvoie un contenu identique à l'état courant.
    this.subs.add(
      this.store.pipe(
        select(selectChosenItems),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      ).subscribe((items: ItemInfos[]) => {
        if (items) {
          const sameStructure =
            this.items.length === items.length &&
            this.items.every((item, i) => item.reference === items[i].reference);
          this.items = items;
          if (!sameStructure) {
            this.initFormArray(items);
          }
        }
      })
    );

    // Sauvegarde le panier dans Firebase basket quand l'utilisateur est connecté.
    // debounceTime + distinctUntilChanged évitent la boucle : basket.on('value') → store → ici → set() → on('value')...
    this.subs.add(
      this.store.pipe(
        select(selectChosenItems),
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter((items: ItemInfos[]) => !!this.userId && items.length > 0)
      ).subscribe((items: ItemInfos[]) => {
        const toSave = items.map(item => ({
          reference: item.reference,
          category: item.category,
          index: item.index,
          selected: true,
          basketInfos: {
            selectedQuantity: item.basketInfos?.selectedQuantity ?? 1,
            selectedSize: item.basketInfos?.selectedSize ?? 'M',
            selectedModel: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
          },
        }));
        firebase.database().ref(`users/${this.userId}/basket`).set(toSave)
          .catch((e: any) => console.error('[basket save]', e));
      })
    );

    // Connexion user (store) + authState (firebase)
    const authState$ = new Observable<firebase.User | null>((subscriber) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(
        (u) => subscriber.next(u),
        (err) => subscriber.error(err)
      );
      return { unsubscribe };
    });

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

            // À la connexion : lecture unique de Firebase basket pour mettre à jour localStorage.
            // C'est localStorage qui reste la source principale du panier.
            firebase.database().ref(`users/${newUser.uid}/basket`).once('value')
              .then((snap: firebase.database.DataSnapshot) => {
                const val = snap.val();
                if (val) {
                  const rawItems: any[] = Array.isArray(val) ? val : Object.values(val);
                  const items = rawItems.filter(Boolean);
                  if (items.length) {
                    localStorage.setItem('delice-basket', JSON.stringify(items));
                    items.forEach((item) => this.store.dispatch(new ActionUpdateBasketItem(item)));
                  }
                }
              })
              .catch((e: any) => console.error('[basket restore]', e));

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
    this.formSubs.unsubscribe();
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
    this.formSubs.unsubscribe();
    this.formSubs = new Subscription();
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

    this.formSubs.add(
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

  getItemTotal(index: number): string {
    const price = this.items[index]?.price ?? 0;
    const qty = Number(this.getItemQuantity(index)?.value) || 1;
    return this.pricing.format(price * qty);
  }

  private get rawTotalHT(): number {
    return this.items.reduce((sum, item, i) => {
      const qty = Number(this.getItemQuantity(i)?.value) || 1;
      return sum + (item.price ?? 0) * qty;
    }, 0);
  }

  get cartTva(): string {
    return this.pricing.format(Math.round(this.rawTotalHT * this.pricing.tvaRate));
  }

  get cartTotal(): string {
    return this.pricing.format(Math.round(this.rawTotalHT * (1 + this.pricing.tvaRate)));
  }

  onCurrencyChange(value: string): void {
    this.pricing.setCurrency(value as any);
  }

  get isFrench(): boolean {
    return (this.translateService.currentLang ?? 'fr') === 'fr';
  }

  sendCommand() {
    const currentUser = firebase.auth().currentUser;

    if (currentUser?.uid) {
      const commendsPath = `users/${currentUser.uid}/commends`;
      const ref = firebase.database().ref(commendsPath);

      // ✅ Lecture unique : évite d'empiler des listeners à chaque clic
      ref
        .once('value')
        .then((snap) => {
          if (this.commendAllreadySent) return;

          // Lire les quantités directement depuis le formulaire pour éviter le délai du debounce :
          // si l'utilisateur vient de modifier une quantité et clique immédiatement sur Envoyer,
          // this.items peut encore avoir l'ancienne valeur (ActionUpdateBasketItem pas encore dispatché).
          const itemsToSend = this.basketItemsArray.controls.map((group, i) => ({
            ...this.items[i],
            basketInfos: {
              selectedQuantity: Number(group.get('quantity')?.value) || 1,
              selectedSize: group.get('size')?.value,
              selectedModel: group.get('model')?.value,
            },
          }));

          const existingCommands = this.getExistingItemsFromSnapShot(snap);

          if (!itemsToSend || itemsToSend.length < 1 || (existingCommands && compareObjects(existingCommands, itemsToSend))) {
            this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
            return;
          }

          this.commendAllreadySent = true;

          // Écriture atomique : on génère la clé push en avance et on fait un set() unique.
          // Contrairement à set(null).then(push()), si l'écriture échoue, les données Firebase
          // précédentes restent intactes et le panier sera correctement restauré au prochain chargement.
          const pushKey = firebase.database().ref().push().key!;
          const payload: Record<string, any> = {};
          payload[pushKey] = itemsToSend;

          return ref.set(payload).then(() => {
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
            this.store.dispatch(new Go({ path: ['/auth/signin'] }));
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
      subject: this.translateService.instant('NEW_ORDER_TITLE'),
      items: emailData,
      displayName: user.displayName,
    };

    console.log('Sending email with data', data);

    const callable = httpsCallable(this.fun, 'genericBrevoEmail');
    from(callable(data)).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }

  gotoTarget(name: string) {
    this.store.dispatch(new Go({ path: ['/' + name] }));
  }

  reload() {
    window.location.reload();
  }
}

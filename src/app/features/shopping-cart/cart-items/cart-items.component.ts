import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import _ from 'lodash';
import { select, Store as NgRxStore } from '@ngrx/store';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, from, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


import {
  ActionClearBasket,
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
import { StockService } from '@shared/services/stock.service';

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
  commendAllreadySent = false;
  deliveryMode: 'pickup' | 'shipping' | null = null;
  shippingAddress = { firstName: '', lastName: '', address1: '', address2: '', postalCode: '', city: '', country: '', phone: '' };
  orderStatuses: { id: string; status: string; createdAt: number; deliveryMode?: string; shippingAddress?: any; shippingCost?: number }[] = [];
  stockByRef: Record<string, number> = {};
  lightboxSrc: string | null = null;

  get activeOrder(): { id: string; status: string; createdAt: number; deliveryMode?: string; shippingAddress?: any; shippingCost?: number } | null {
    return this.orderStatuses.length > 0 ? this.orderStatuses[0] : null;
  }

  get hasOutOfStockItems(): boolean {
    // Si l'utilisateur met à jour une commande existante, le stock a déjà été
    // décrémenté par lui lors de sa commande initiale : ne pas le bloquer.
    if (this.activeOrder) return false;
    return this.items.some(item => (this.stockByRef[item.reference] ?? 1) <= 0);
  }

  isItemOutOfStock(reference: string): boolean {
    // Même logique : pas "épuisé" pour le propriétaire de la commande active
    if (this.activeOrder) return false;
    return (this.stockByRef[reference] ?? 1) <= 0;
  }

  get isShippingAddressValid(): boolean {
    const a = this.shippingAddress;
    return !!(a.firstName.trim() && a.lastName.trim() && a.address1.trim() && a.postalCode.trim() && a.city.trim() && a.country.trim() && a.phone.trim());
  }

  get isBasketUnchanged(): boolean {
    if (!this.activeOrder || !this.firebaseBasketSnapshot.length) return false;
    if (this.firebaseBasketSnapshot.length !== this.items.length) return false;
    return this.basketItemsArray.controls.every((group, i) => {
      const ref = this.items[i]?.reference;
      const snap = this.firebaseBasketSnapshot.find(s => s.reference === ref);
      if (!snap) return false;
      return snap.qty === (Number(group.get('quantity')?.value) || 1)
        && snap.size === group.get('size')?.value
        && snap.model === group.get('model')?.value;
    });
  }

  get canSend(): boolean {
    if (this.activeOrder && this.isBasketUnchanged) return false;
    if (this.deliveryMode === 'shipping') return this.isShippingAddressValid;
    return this.deliveryMode === 'pickup';
  }
  private readonly snackDuration: number;
  private orderStatusRef?: firebase.database.Reference;

  readonly statusLabels: Record<string, string> = {
    pending:  'En attente',
    ready:    'Prête — consultez votre email',
    paid:     'Payée',
    shipped:  'Expédiée',
  };

  readonly statusColors: Record<string, string> = {
    pending:  '#e67e22',
    ready:    '#148f77',
    paid:     '#2c3e50',
    shipped:  '#6c3483',
  };

  ItemsCategoriesEnum = ItemsCategoriesEnum;

  @Input()
  categoryInfos$!: Observable<ExistingCategories>;

  private subs = new Subscription();
  private formSubs = new Subscription();
  private commendsRef?: firebase.database.Reference;
  private firebaseBasketSnapshot: { reference: string; qty: number; size: string; model: string }[] = [];
  private snapshotOrderId: string | null = null;

  constructor(
    private store: NgRxStore<any>,
    private fb: UntypedFormBuilder,
    private fun: Functions,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    public pricing: PricingService,
    public stockService: StockService,
    @Inject(APP_CONFIG) appConfig: IAppConfig
  ) {
    this.snackDuration = appConfig.snackDuration;
  }

  ngOnInit(): void {

    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));

    // Écoute le stock en temps réel via StockService (singleton partagé)
    this.subs.add(
      this.stockService.stockByRef$.subscribe(map => { this.stockByRef = map; })
    );

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

            // Écoute en temps réel le statut des commandes de l'utilisateur
            if (this.orderStatusRef) this.orderStatusRef.off();
            this.orderStatusRef = firebase.database().ref(`users/${newUser.uid}/orderStatus`);
            this.orderStatusRef.on('value', (snap) => {
              // Détecter la suppression d'un order actif AVANT le return anticipé :
              // si snap est vide et qu'on avait des orders actifs, ils ont été supprimés.
              const raw = snap.exists() ? (snap.val() as Record<string, any>) : {};
              const prevActiveIds = this.orderStatuses.map(o => o.id);
              const wasDeleted = prevActiveIds.some(id => !raw[id]);
              if (wasDeleted) {
                localStorage.removeItem('delice-basket');
                localStorage.setItem('basketCleared', '1');
                this.store.dispatch(new ActionClearBasket());
                this.commendAllreadySent = false;
              }
              if (!snap.exists()) { this.orderStatuses = []; return; }

              this.orderStatuses = Object.entries(raw)
                .map(([id, data]) => ({
                  id,
                  status: data.status ?? 'pending',
                  createdAt: data.createdAt ?? 0,
                  deliveryMode: data.deliveryMode,
                  shippingAddress: data.shippingAddress,
                  shippingCost: typeof data.shippingCost === 'number' ? data.shippingCost : undefined,
                }))
                .filter(o => o.status !== 'shipped' && o.status !== 'cancelled')
                .sort((a, b) => b.createdAt - a.createdAt);

              // Pré-remplir le mode de livraison depuis la commande active (si pas encore choisi)
              const active = this.orderStatuses[0];
              if (!this.deliveryMode && active) {
                // Fallback 'pickup' si le champ n'existe pas (anciennes commandes)
                this.deliveryMode = (active.deliveryMode as 'pickup' | 'shipping') || 'pickup';
                if (active.deliveryMode === 'shipping' && active.shippingAddress) {
                  this.shippingAddress = { ...active.shippingAddress };
                }
              }

              // Capturer le snapshot depuis les items DE LA COMMANDE (orderStatus),
              // pas depuis le panier — le panier peut déjà contenir de nouveaux articles
              // non encore commandés, ce qui fausserait isBasketUnchanged.
              if (active && active.id !== this.snapshotOrderId) {
                this.snapshotOrderId = active.id;
                const orderItems = raw[active.id]?.items;
                const itemsArray: any[] = Array.isArray(orderItems)
                  ? orderItems
                  : (orderItems && typeof orderItems === 'object' ? Object.values(orderItems) : []);
                this.firebaseBasketSnapshot = itemsArray.map((item: any) => ({
                  reference: item.reference,
                  qty: Math.max(1, item.basketInfos?.selectedQuantity ?? 1),
                  size: item.basketInfos?.selectedSize ?? 'M',
                  model: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
                }));
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
    this.formSubs.unsubscribe();
    this.detachCommendsListener();
    if (this.orderStatusRef) { this.orderStatusRef.off(); this.orderStatusRef = undefined; }
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
    const itemRef = this.items[index]?.reference;
    this.stockService.fetchAvailable(itemRef).subscribe(available => {
      const currentQty = Number(this.getItemQuantity(index).value) || 0;
      if (available > currentQty) {
        this.getItemQuantity(index).patchValue(currentQty + 1);
      } else {
        this.snackBar.openFromComponent(SnackAlertComponent, {
          duration: 3000,
          data: { message: 'Stock insuffisant — quantité maximale atteinte.', type: 'error' },
          politeness: 'assertive',
        });
      }
    });
  }

  getItemQuantity(index: number): UntypedFormControl {
    return this.basketItemsArray.controls[index].get('quantity') as UntypedFormControl;
  }

  selectDeliveryMode(mode: 'pickup' | 'shipping'): void {
    this.deliveryMode = mode;
    if (mode !== 'shipping') return;

    // Pré-remplir seulement si le formulaire est encore vierge
    const a = this.shippingAddress;
    if (a.firstName || a.lastName || a.phone) return;

    const user = firebase.auth().currentUser;
    if (!user) return;

    const displayName = user.displayName?.trim() ?? '';
    const spaceIdx = displayName.indexOf(' ');
    if (spaceIdx > 0) {
      a.firstName = displayName.slice(0, spaceIdx);
      a.lastName  = displayName.slice(spaceIdx + 1);
    } else {
      a.firstName = displayName;
    }

    if (user.phoneNumber) {
      a.phone = user.phoneNumber;
    }
  }

  getItemTotal(index: number): string {
    const item = this.items[index];
    const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
    const qty = Number(this.getItemQuantity(index)?.value) || 1;
    return this.pricing.format(price * qty);
  }

  private get rawTotalHT(): number {
    return this.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      const qty = Number(this.getItemQuantity(i)?.value) || 1;
      return sum + price * qty;
    }, 0);
  }

  /** Frais de port stockés en XAF, convertis en EUR pour pricing.format(). */
  get shippingCostEur(): number | null {
    if (this.deliveryMode !== 'shipping') return null;
    const costXAF = this.activeOrder?.shippingCost;
    if (typeof costXAF !== 'number') return null;
    return costXAF / this.pricing.eurToXaf;
  }

  get cartTva(): string {
    return this.pricing.format(this.rawTotalHT * this.pricing.tvaRate);
  }

  get cartTotal(): string {
    // Sommer les montants affichés par item (après arrondi) pour éviter les
    // écarts d'arrondi entre somme_format(items) et format(somme_items).
    const itemsDisplay = this.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      const qty   = Number(this.getItemQuantity(i)?.value) || 1;
      return sum + this.pricing.formatRaw(price * qty);
    }, 0);
    const tvaDisplay      = this.pricing.formatRaw(this.rawTotalHT * this.pricing.tvaRate);
    const shippingDisplay = this.pricing.formatRaw(this.shippingCostEur ?? 0);
    return this.pricing.formatAmount(itemsDisplay + tvaDisplay + shippingDisplay);
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
            price: this.pricing.getEffectiveEur(this.items[i].reference, this.items[i].price ?? 0),
            basketInfos: {
              selectedQuantity: Number(group.get('quantity')?.value) || 1,
              selectedSize: group.get('size')?.value,
              selectedModel: group.get('model')?.value,
            },
          }));

          if (!itemsToSend || itemsToSend.length < 1) {
            this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
            return;
          }

          if (!this.deliveryMode) {
            this.alertCommandNotSent('Veuillez choisir un mode de livraison avant d\'envoyer votre commande.');
            return;
          }

          const existingOrderId = this.activeOrder?.id ?? null;

          // Vérification "déjà envoyé" seulement pour une nouvelle commande
          if (!existingOrderId) {
            const existingCommands = this.getExistingItemsFromSnapShot(snap);
            if (existingCommands && compareObjects(existingCommands, itemsToSend)) {
              this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
              return;
            }
          }

          this.commendAllreadySent = true;

          const orderKey = existingOrderId ?? firebase.database().ref().push().key!;
          const payload: Record<string, any> = {};
          payload[orderKey] = itemsToSend;

          return ref.set(payload).then(() => {
            if (!currentUser.isAnonymous) {
              const shippingAddress = this.deliveryMode === 'shipping' ? { ...this.shippingAddress } : null;

              if (existingOrderId) {
                // Mise à jour de la commande existante (status inchangé)
                firebase.database().ref(`orders/${existingOrderId}`).update({
                  items: itemsToSend,
                  deliveryMode: this.deliveryMode,
                  updatedAt: Date.now(),
                  shippingAddress: shippingAddress ?? null,
                }).catch((e: any) => console.error('[orders] update error', e));

                firebase.database().ref(`users/${currentUser.uid}/orderStatus/${existingOrderId}`).update({
                  items: itemsToSend,
                  deliveryMode: this.deliveryMode,
                  shippingAddress: shippingAddress ?? null,
                }).catch((e: any) => console.error('[orderStatus] update error', e));

                // Permet une nouvelle mise à jour ultérieure
                this.commendAllreadySent = false;
              } else {
                // Nouvelle commande
                const orderCreatedAt = Date.now();
                firebase.database().ref(`orders/${orderKey}`).set({
                  status: 'pending',
                  uid: currentUser.uid,
                  createdAt: orderCreatedAt,
                  customerEmail: currentUser.email ?? '',
                  customerName: currentUser.displayName ?? currentUser.email ?? '',
                  items: itemsToSend,
                  deliveryMode: this.deliveryMode,
                  ...(shippingAddress ? { shippingAddress } : {}),
                }).catch((e: any) => console.error('[orders] double-write error', e));

                firebase.database().ref(`users/${currentUser.uid}/orderStatus/${orderKey}`).set({
                  status: 'pending',
                  createdAt: orderCreatedAt,
                  items: itemsToSend,
                  deliveryMode: this.deliveryMode,
                  ...(shippingAddress ? { shippingAddress } : {}),
                }).catch((e: any) => console.error('[orderStatus] write error', e));
              }

              // Mise à jour du stock pour chaque article (transaction atomique)
              // Pour une modification de commande : delta = newQty - oldQty
              // Pour une nouvelle commande : delta = newQty (décrémentation complète)
              const oldItemsMap: Record<string, number> = {};
              if (existingOrderId) {
                const snapVal = snap.val() as Record<string, any> | null;
                const rawOldItems = snapVal?.[existingOrderId];
                // Firebase peut retourner un tableau ou un objet ({ "0": item, "1": item })
                const oldItems: any[] = Array.isArray(rawOldItems)
                  ? rawOldItems
                  : (rawOldItems && typeof rawOldItems === 'object' ? Object.values(rawOldItems) : []);
                oldItems.forEach((old: any) => {
                  if (old?.reference) {
                    oldItemsMap[old.reference] = old.basketInfos?.selectedQuantity ?? 1;
                  }
                });
              }

              // Articles toujours présents : appliquer le delta newQty - oldQty
              itemsToSend.forEach(item => {
                const newQty = item.basketInfos?.selectedQuantity ?? 1;
                const oldQty = oldItemsMap[item.reference] ?? 0;
                const delta = newQty - oldQty;
                if (delta === 0) return;
                const knownAvailable = this.stockByRef[item.reference] ?? 0;
                firebase.database().ref(`stock/${item.reference}`).transaction((current) => {
                  if (current === null) return { available: Math.max(0, knownAvailable - delta) };
                  return { ...current, available: Math.max(0, (current.available ?? knownAvailable) - delta) };
                }).catch((e: any) => console.error('[stock delta]', e));
              });

              // Articles supprimés de la commande : libérer intégralement leur stock
              Object.entries(oldItemsMap).forEach(([reference, oldQty]) => {
                if (itemsToSend.some(item => item.reference === reference)) return;
                const knownAvailable = this.stockByRef[reference] ?? 0;
                firebase.database().ref(`stock/${reference}`).transaction((current) => {
                  if (current === null) return { available: knownAvailable + oldQty };
                  return { ...current, available: (current.available ?? knownAvailable) + oldQty };
                }).catch((e: any) => console.error('[stock release]', e));
              });

              if (!existingOrderId) {
                this.sendCommendNotificationMails(currentUser);
              }

              // Mettre à jour le snapshot pour refléter le nouvel état Firebase
              this.firebaseBasketSnapshot = this.basketItemsArray.controls.map((group, i) => ({
                reference: this.items[i]?.reference,
                qty: Number(group.get('quantity')?.value) || 1,
                size: group.get('size')?.value,
                model: group.get('model')?.value,
              }));

              this.snackBar.openFromComponent(SnackAlertComponent, {
                duration: this.snackDuration,
                data: { message: 'COMMAND_SENT_MSG', type: 'success' },
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

  private sendCommendNotificationMails(user: firebase.User, isUpdate = false) {
    const protocol = window.location.protocol;
    let prefix = protocol + '//' + window.location.host;
    if (prefix.indexOf('github') > 0) {
      prefix = prefix + '/' + environment.appId;
    }

    const currency = this.pricing.currency;
    const currencySymbol = currency === 'XAF' ? 'FCFA' : '€';
    const tvaRate = this.pricing.tvaRate;
    const hasTva = tvaRate > 0;

    const emailData = _.cloneDeep(this.basketItemsArray.controls).map((group, i) => {
      const item = _.cloneDeep(this.items[i]);
      const qty = Number(group.get('quantity')?.value) || 1;
      // Utilise cover.jpeg pour l'email (compatibilité Outlook / clients sans WebP)
      const emailPath = item.path.replace(/cover\.webp$/, 'cover.jpeg');
      item.path = prefix + '/' + emailPath;
      item.basketInfos = {
        selectedQuantity: qty,
        selectedSize: group.get('size')?.value,
        selectedModel: group.get('model')?.value,
      };
      delete (item as any).loading;
      delete (item as any).selected;
      delete (item as any).index;
      (item as any).unitPriceFormatted = this.pricing.format(item.price ?? 0);
      (item as any).linePriceFormatted = this.pricing.format((item.price ?? 0) * qty);
      return item;
    });

    const rawTotalHT = emailData.reduce((sum, item) =>
      sum + (item.price ?? 0) * (item.basketInfos?.selectedQuantity ?? 1), 0);
    const rawTva = hasTva ? Math.round(rawTotalHT * tvaRate) : 0;
    const rawTotalTTC = rawTotalHT + rawTva;

    const deliveryModeLabel = this.deliveryMode === 'pickup'
      ? 'Retrait en magasin — Libreville'
      : this.deliveryMode === 'shipping'
        ? 'Expédition internationale'
        : '';

    const sa = this.shippingAddress;
    const shippingAddressFormatted = this.deliveryMode === 'shipping' ? [
      `${sa.firstName} ${sa.lastName}`,
      sa.address1,
      sa.address2 ? sa.address2 : null,
      `${sa.postalCode} ${sa.city}`,
      sa.country,
      `Tél : ${sa.phone}`,
    ].filter(Boolean).join('\n') : '';

    const data = {
      shoppingCardLink: prefix + '/#/shopping-cart',
      uid: user.uid,
      subject: isUpdate
        ? `[MODIFICATION] ${this.translateService.instant('NEW_ORDER_TITLE')}`
        : this.translateService.instant('NEW_ORDER_TITLE'),
      items: emailData,
      displayName: user.displayName,
      currency,
      currencySymbol,
      hasTva,
      totalHT: rawTotalHT,
      tva: rawTva,
      totalTTC: rawTotalTTC,
      deliveryMode: this.deliveryMode,
      deliveryModeLabel,
      shippingAddress: this.deliveryMode === 'shipping' ? { ...this.shippingAddress } : null,
      shippingAddressFormatted,
    };

    console.log('Sending email with data', data);

    const callable = httpsCallable(this.fun, 'genericBrevoEmail');
    from(callable(data)).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }

  openLightbox(src: string): void { this.lightboxSrc = src; }
  closeLightbox(): void { this.lightboxSrc = null; }

  gotoTarget(name: string) {
    this.store.dispatch(new Go({ path: ['/' + name] }));
  }

  reload() {
    window.location.reload();
  }
}

import {Component, OnInit} from '@angular/core';
import {
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
import {SigninComponent} from '@app/auth/signin/signin.component';
import {selectorConnectedUser} from '@app/auth/store/auth.selectors';

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

  connectedUser$: Observable<any>;
  items = [];
  dialogRef = undefined;


  constructor(private store: Store<any>,
              private fb: FormBuilder,
              public afAuth: AngularFireAuth,
              private fun: AngularFireFunctions,
              private dialog: MatDialog) {
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

    this.connectedUser$ = this.store.pipe(
      select(selectorConnectedUser)
    );
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
    return group
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

  /*
    sendCommand1() {
      this.sgMsg.setApiKey(environment.firebaseConfig.apiKey);
      const data = {
        from: 'delice.eternel.gabon@gmail.com',
        templateId: 'd-0116c8e99b5d41f084d82628bec04620',
        to: 'delice.eternel.gabon@gmail.com',
        subject: 'Test 2',
      };
      this.sgMsg.send(data)
        .then(success => console.log('sent email successfully!', success))
        .catch(error => console.log(error))
    }
   */


  sendCommand() {
    if (!!firebase.auth().currentUser) {
      this.fillCommendAndSend(firebase.auth().currentUser);
    } else {
      this.dialogRef = this.dialog.open(SigninComponent, {
        panelClass: 'signin-dialog',
        disableClose: false,
        autoFocus: true,
      });
      this.dialogRef.afterClose().subscribe(
        () => {
          this.dialogRef = undefined;
        }
      )
    }
  }

  private fillCommendAndSend(user: firebase.User) {
    const callable = this.fun.httpsCallable('genericSendgridEmail');
    const data = {
      text: `Commande reçue: ` + JSON.stringify(this.items),
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
      subject: 'Nouvelle commande internet!'
    };
    callable(data).subscribe(result => console.log(result));
  }


}

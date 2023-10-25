import { Component, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { DialogEditAddressComponent } from '../edit-components/dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserNameEmailComponent } from '../edit-components/dialog-edit-user-name-email/dialog-edit-user-name-email.component';
import { DialogEditBuyedProductsComponent } from '../edit-components/dialog-edit-buyed-products/dialog-edit-buyed-products.component';
import { User } from 'src/models/user.class';
import { ProductNamePriceService } from 'src/models/product-name-price.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  user = new User;
  userId!: string;
  index!: number;
  amount!: number;
  firestore: Firestore = inject(Firestore);
  name!: string[];
  price!: number[];

  unsubUserDetail;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private productNamePrice: ProductNamePriceService) {
    this.unsubUserDetail = this.subUserDetail();
    this.getRouteId();
    this.name = productNamePrice.getName();
    this.price = productNamePrice.getPrice();
  }

  //----Subscribe-Functions----//

  getRouteId() {
    this.route.params.subscribe(paramsId => {
      this.userId = paramsId['id'];
    });
  }

  subUserDetail() {
    return onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
        if (element.id == this.userId) {
          this.user = element.data() as User;
        }
      })
    })
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUserDetail;

  }

  //----Open-Dialogs-Functions----//

  openDialogEditAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.userData = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  openDialogEditNameEmail() {
    const dialog = this.dialog.open(DialogEditUserNameEmailComponent);
    dialog.componentInstance.userData = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  openDialogEditAmounts(i: number) {
    const dialog = this.dialog.open(DialogEditBuyedProductsComponent);
    dialog.componentInstance.userData = new User(this.user);
    dialog.componentInstance.userId = this.userId;
    this.index = i;
    this.amount = this.user['amount'][i];
    dialog.componentInstance.index = this.index;
    dialog.componentInstance.amount = this.amount;

  }

  //-----Calculate-Functions----//

  calculateTotalAmount() {
    let totalAmount = 0;
    let total = this.user['amount'];
    for (let i = 0; i < total.length; i++) {
      totalAmount += total[i];
    }
    return totalAmount;
  }

  calculateTotalValue() {
    let totalValue = 0;
    let value = this.user['amount'];
    for (let i = 0; i < value.length; i++) {
      let currValue = 0
      currValue = this.price[i] * value[i]
      totalValue += currValue;
    }
    return totalValue
  }

}




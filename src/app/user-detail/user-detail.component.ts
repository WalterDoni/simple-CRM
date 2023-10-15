import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserNameEmailComponent } from '../dialog-edit-user-name-email/dialog-edit-user-name-email.component';
import { User } from 'src/models/user.class';
import { ProductNamePriceService } from 'src/models/product-name-price.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  user = new User;
  userId = '';
  collectionInstance: any;
  userData: DocumentData[] = []
  firestore: Firestore = inject(Firestore);
  unsubUserDetail;
  unsubRouteId;
  name!: any[];
  price!: any[];



  constructor(private route: ActivatedRoute, public dialog: MatDialog, private productNamePrice: ProductNamePriceService) {
    this.unsubUserDetail = this.subUserDetail();
    this.unsubRouteId = this.subRouteId();
    this.name = productNamePrice.getName();
    this.price = productNamePrice.getPrice();

  }

  subRouteId() {

    this.route.params.subscribe(paramsId => {
      this.userId = paramsId['id'];
      console.log(this.userId);
    });
  }

  subUserDetail() {
    this.collectionInstance = onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
        if (element.id == this.userId) {
          this.userData.push(element.data());
          this.user = this.userData[0] as User
          console.log(this.userData);
        }
      })
    })
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUserDetail;
    this.unsubRouteId;
  }

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


  calculateTotalAmount(){
    let totalAmount = 0;
    let total = this.userData[0]['amount'];
    for (let i = 0; i < total.length; i++) {
      totalAmount += total[i];
    }
    return totalAmount;
}

 calculateTotalValue(){
  let totalValue = 0;
  let value = this.userData[0]['amount'];
 
  for (let i = 0; i < value.length; i++) {
    let currValue = 0
    currValue = this.price[i] * value[i]
     totalValue += currValue;
  }

  return totalValue
 }
 
}




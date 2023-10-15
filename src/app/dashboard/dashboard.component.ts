import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Items } from 'src/models/item.class';
import { ProductNamePriceService } from 'src/models/product-name-price.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  allUsers: DocumentData[] = [];
  productPrices!: any[];

  unsubUsers;

  constructor(public dialog: MatDialog, private productNamePrice: ProductNamePriceService) {
    this.unsubUsers = this.subUsers();
    this.productPrices =  productNamePrice.getPrice();
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      const currentUsers: DocumentData[] = [];
      list.forEach(element => {
        currentUsers.push({ data: element.data() });
      });
      this.allUsers = currentUsers;
      console.log(this.allUsers);
    });
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  calcProductSales() {
    let totalValue = 0;
    this.allUsers.forEach((user) => {
      let singleUserTotalAmount = 0;
      user['data']['amount'].forEach((amount: any) => {
        singleUserTotalAmount += amount;
      });
      totalValue += singleUserTotalAmount;
    });
    return totalValue;
  }

  calculateAmountOfSingleProduct(i: number) {
    let totalAmountSingleProduct = 0;
    this.allUsers.forEach((user) => {
      let currentUser = user['data']['amount'];
      totalAmountSingleProduct += currentUser[i];
    });
    return totalAmountSingleProduct;
  }

  calculateTotalValueOfAllSales(): number {
    let totalValue = 0;
    this.productPrices.forEach((item, i) => {
      totalValue += this.calculateAmountOfSingleProduct(i) * item;
    });
    return totalValue;
  }


}


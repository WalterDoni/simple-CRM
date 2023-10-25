import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProductNamePriceService } from 'src/models/product-name-price.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent {

  firestore: Firestore = inject(Firestore);
  allUsers: DocumentData[] = [];
  productNames!: any[];
  productPrices!: any[];
  unsubUsers;

  constructor(public dialog: MatDialog, private productNamePrice: ProductNamePriceService) {
  
    this.unsubUsers = this.subUsers();
    this.productNames = productNamePrice.getName();
    this.productPrices = productNamePrice.getPrice();
  }
  
  //----Subscribe-Functions-> Firebase----//
  subUsers(){
    return onSnapshot(this.usersRef(), (list) =>{
      let currentUser: DocumentData[] = [];
      list.forEach(element => {
        currentUser.push({ data: element.data()});
      });
      this.allUsers = currentUser;
    });
  }

  usersRef(){
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  //----Calculater-Functions----//
  
  /**
   * Display how often one product has been sold.
   */
  calculateAmountOfSingleProduct(i: number) {
    let totalAmountSingleProduct = 0;
    this.allUsers.forEach((user) => {
      let currentUser = user['data']['amount'];
      totalAmountSingleProduct += currentUser[i];
    });
    return totalAmountSingleProduct;
  }
  
  /**
   * Display the total value of one sold product, depends how often it has been sold.
   */
  calculateTotalValueOfAllSales(): number {
    let totalValue = 0;
    this.productPrices.forEach((item, i) => {
      totalValue += this.calculateAmountOfSingleProduct(i) * item;
    });
    return totalValue;
  }
  
}


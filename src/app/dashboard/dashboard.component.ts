import { Component, Input, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ProductNamePriceService } from 'src/models/product-name-price.service';
import { MatSort } from '@angular/material/sort';
import { AddSalesComponent } from '../add-sales/add-sales.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input('matSortStart')
  start!: 'desc';

  firestore: Firestore = inject(Firestore);
  allUsers: DocumentData[] = [];
  productPrices!: any[];
  valueSort: { name: string, value: number }[] = [];

  unsubUsers;

  constructor(public dialog: MatDialog, private productNamePrice: ProductNamePriceService) {
    this.unsubUsers = this.subUsers();
    this.productPrices = productNamePrice.getPrice();

  }

  //----Subscribe-Functions-> Firebase----//

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      const currentUsers: DocumentData[] = [];
      list.forEach(element => {
        currentUsers.push({ data: element.data() });
      });
      this.allUsers = currentUsers;
      this.calculateTotalValueOfCompany();
    });
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  //----Calculator-Functions----//

  /**
   * Calculate the total amount of products sold.
   */
  calcProductSales() {
    let totalValue = 0;
    this.allUsers.forEach((user) => {
      let singleUserTotalAmount = 0;
      user['data']['amount'].forEach((amount: number) => {
        singleUserTotalAmount += amount;
      });
      totalValue += singleUserTotalAmount;
    });
    return totalValue;
  }

  /**
   * Calculate the total value of products sold.
   */
  calculateTotalValueOfAllSales(): number {
    let totalValue = 0;
    this.productPrices.forEach((item, i) => {
      totalValue += this.calculateAmountOfSingleProduct(i) * item;
    });
    return totalValue;
  }

   /**
   * Calculate the total value of every single company and display them on the table, with the possibility to sort them.
   */
  calculateTotalValueOfCompany(){
    this.allUsers.forEach((user) => {
      let totalValue = 0;
      user['data']['amount'].forEach((amount: number, i: number) => {
        let value = amount * this.productPrices[i];
        totalValue += value;
      });
      let companyName = user['data']['company'];
      let companyValue = { name: companyName , value: totalValue};
      if (this.valueSort.length < this.allUsers.length) {
        this.valueSort.push(companyValue);
      }
    })
  }

  /**
   * Calculate how often one product has been sold.
   */
  calculateAmountOfSingleProduct(i: number) {
    let totalAmountSingleProduct = 0;
    this.allUsers.forEach((user) => {
      let currentUser = user['data']['amount'];
      totalAmountSingleProduct += currentUser[i];
    });
    return totalAmountSingleProduct;
  }

  //----Sortfunction---//

  /**
   * Sortfunction by Material Design. Allow to sort from biggest to smallest value.
   */
  sortData(sort: Sort) {
    const data = this.valueSort.slice();
    if (!sort.active || sort.direction === '') {
      this.valueSort = data;
      return;
    }
    this.valueSort = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'value':
          return isAsc ? b.value - a.value : a.value - b.value;
        default:
          return 0;
      }
    });
  }


  openDialogAddSales(){
    const dialog = this.dialog.open(AddSalesComponent)
  }

}



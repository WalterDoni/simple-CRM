import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Items } from 'src/models/item.class';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent {

  firestore: Firestore = inject(Firestore);
  item = new Items;
  allItems: DocumentData[] = [];
  allUsers: DocumentData[] = [];


  unsubItems;
  unsubUsers;

  constructor(public dialog: MatDialog) {
    this.unsubItems = this.subItems();
    this.unsubUsers = this.subUsers();
  }

  subItems() {
    return onSnapshot(this.itemsRef(), (list) => {
      let currentItem: DocumentData[] =  [];
      list.forEach(element => {
        currentItem.push({ data: element.data(), id: element.id });
      });
      this.allItems = currentItem;
    });
  }

  itemsRef() {
    return collection(this.firestore, 'items');
  }

  subUsers(){
    return onSnapshot(this.usersRef(), (list) =>{
      let currentUser: DocumentData[] = [];
      list.forEach(element => {
        currentUser.push({ data: element.data()});
      });
      this.allUsers = currentUser;
      console.log(this.allUsers);
      console.log(this.allUsers[0]['data']['amount'][0]);
    });
  }

  usersRef(){
    return collection(this.firestore, 'users');
  }


  calculateAmountOfSingleProduct(i: number) {
    let totalAmountSingleProduct = 0;
    for (let v = 0; v < this.allUsers.length; v++) {
      let currentUser = this.allUsers[v]['data']['amount'];
   
      totalAmountSingleProduct += currentUser[i];
    }

    return totalAmountSingleProduct;
  }


  calculateTotalValueOfAllSales(): number {
    let totalValue = 0;
    for (let i = 0; i < this.allItems.length; i++) {
      totalValue += this.calculateAmountOfSingleProduct(i) * this.allItems[i]['data']['price'];
    }
    return totalValue;
  }
  
}


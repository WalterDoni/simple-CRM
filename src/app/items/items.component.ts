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


  unsubItems;

  constructor(public dialog: MatDialog) {
    this.unsubItems = this.subItems();
  }


  subItems() {
    return onSnapshot(this.itemsRef(), (list) => {
      const currentItem: DocumentData[] =  [];
      list.forEach(element => {
        currentItem.push({ data: element.data(), id: element.id });
      });
      this.allItems = currentItem;
      console.log(this.allItems);
      
    });
  }

  itemsRef() {
    return collection(this.firestore, 'items');
  }


  calculateTotal(): number {
    let total = 0;
    for (let item of this.allItems) {
      total += item['data']['amount'] * item['data']['price'];
    }
    return total;
  }
  
}


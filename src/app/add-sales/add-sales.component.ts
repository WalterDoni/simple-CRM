import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductNamePriceService } from 'src/models/product-name-price.service';



@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})

export class AddSalesComponent {
  allUsers: DocumentData[] = [];
  firestore: Firestore = inject(Firestore);
  productNames!: string[];
  selectedCompany!: string;
  selectedProduct!: string;
  selectedAmount!: number;
  unsubUsers;

  constructor(public dialogRef: MatDialogRef<AddSalesComponent>, private productNamePrices: ProductNamePriceService) {
    this.unsubUsers = this.subUsers();
    this.productNames = productNamePrices.getName();
  }

  async addAmountToSelectedUserAndProduct() {
    if (isNaN(Number(this.selectedAmount)) || Number(this.selectedAmount) < 0 || Number(this.selectedAmount) > 99) {
      alert('Invalid value: Please insert a number between 0 and 99.');
      return;
    } else {
      let selectedUser = collection(this.firestore, 'users');
      for (let i = 0; i < this.allUsers.length; i++) {
        let currentUser = this.allUsers[i]['data'];
        let currentID = this.allUsers[i]['id']
        if (currentUser['company'] == this.selectedCompany) {
          for (let p = 0; p < this.productNames.length; p++) {
            let currentName = this.productNames[p];
            if (currentName == this.selectedProduct) {
              let newAmountArray = [...this.allUsers[i]['data']['amount']];
              newAmountArray[p] = newAmountArray[p] + this.selectedAmount;
              await updateDoc(doc(selectedUser, currentID), {
                amount: newAmountArray,
              })
            }
          }
        }
      }
    }

  }

  dialogClose() {
    this.dialogRef.close();
  }


  //----Subscribe-Functions-> Firebase----//

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      const currentUsers: DocumentData[] = [];
      list.forEach(element => {
        currentUsers.push({ data: element.data(), id: element.id });
      });
      this.allUsers = currentUsers;
    });
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }



}



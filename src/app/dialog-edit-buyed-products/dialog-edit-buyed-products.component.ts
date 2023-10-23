import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-buyed-products',
  templateUrl: './dialog-edit-buyed-products.component.html',
  styleUrls: ['./dialog-edit-buyed-products.component.scss']
})

export class DialogEditBuyedProductsComponent{
  userData: User = new User();
  index!: number;
  amount!: number;
  userId: string = '';
  loading: boolean = false;
  firestore: Firestore = inject(Firestore)
  
  
  constructor(public dialogRef: MatDialogRef<DialogEditBuyedProductsComponent>) {
  }
 
  dialogClose() {
    this.dialogRef.close();
  }

  async changeSelectedUserDetails() {
    this.loading = true;
    let selectedUser = collection(this.firestore, 'users');
    this.userData['amount'][this.index] = this.amount
    await updateDoc(doc(selectedUser, this.userId), this.userData.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }

}


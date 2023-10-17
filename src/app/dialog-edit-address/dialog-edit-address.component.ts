import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})

export class DialogEditAddressComponent {
  userData: User = new User();
  userId: string = '';
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  

  constructor(private dialogRef: MatDialogRef<DialogEditAddressComponent>) {
   }

  dialogClose() {
    this.dialogRef.close();
  }

  async changeSelectedUserDetails() {
  
    this.loading = true;
    let selectedUser = collection(this.firestore, 'users')
    await updateDoc(doc(selectedUser, this.userId), this.userData.toJSON());
    this.loading = false;
    this.dialogRef.close();
   
  }
}


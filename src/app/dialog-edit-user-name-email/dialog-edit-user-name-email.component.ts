import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user-name-email',
  templateUrl: './dialog-edit-user-name-email.component.html',
  styleUrls: ['./dialog-edit-user-name-email.component.scss']
})
export class DialogEditUserNameEmailComponent {
  userData = new User;
  userId!:string;
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserNameEmailComponent>) { }

  dialogClose() {
    this.dialogRef.close();

  }

  changeSelectedUserDetails() {
    console.log('test');

  }




}

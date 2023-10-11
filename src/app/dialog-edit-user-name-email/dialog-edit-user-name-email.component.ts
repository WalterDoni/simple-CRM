import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user-name-email',
  templateUrl: './dialog-edit-user-name-email.component.html',
  styleUrls: ['./dialog-edit-user-name-email.component.scss']
})
export class DialogEditUserNameEmailComponent {
  userData: DocumentData[] = []
  loading = false;

constructor(public dialogRef: MatDialogRef<DialogEditUserNameEmailComponent>){}

  dialogClose(){
    this.dialogRef.close();
    
  }

  saveNewUser(){
    console.log('test');
    
  }




}

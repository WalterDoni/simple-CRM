import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from 'src/models/user.class';
;

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  userData: DocumentData[] = []
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}

dialogClose(){
  this.dialogRef.close();
}

saveNewUser(){
  console.log('test');
  
}



}

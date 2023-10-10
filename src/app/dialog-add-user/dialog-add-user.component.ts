import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);



  unsubUsers;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.unsubUsers = this.subUsers();
  }

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
        //console.log(element.data());
      });
    })
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }


  async saveNewUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    this.loading = true;
    const userData = this.user.toJSON();
    await addDoc(this.usersRef(), userData).catch(
      (err) => { console.error(err); }
    ).then(
      () => setTimeout(() => {
        this.loading = false;
        this.dialogRef.close();
      }, 500)
    )
  }

  dialogClose() {
    this.dialogRef.close();
  }
}

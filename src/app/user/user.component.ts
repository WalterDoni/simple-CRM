import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { DocumentData, Firestore, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  allUsers: DocumentData[] = [];
  currentUserID : string = '';
  firestore: Firestore = inject(Firestore);
  unsubUsers;

  constructor(public dialog: MatDialog) {
    this.unsubUsers = this.subUsers();
    console.log(this.singeUserRef);
  }


  async updateUser(currentuser: User){
  if(currentuser.id){
    let docRef = this.singeUserRef('users',currentuser.id)
    await updateDoc(docRef, this.getCleanJson(currentuser))

  }
  }


  getCleanJson(currentuser: User) : {}{
    return {
      firstName: currentuser.firstName,
      lastName: currentuser.lastName,
      birthDate: currentuser.birthDate,
      street: currentuser.street,
      country: currentuser.country,
      zipCode: currentuser.zipCode,
      city: currentuser.city,
  };
  }

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
        this.allUsers.push(element.data())
        console.log(this.allUsers);
      });
    })
  }

  ngonDestroy() {
    this.unsubUsers();
  }
  openDialog() {
    this.dialog.open(DialogAddUserComponent);

  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  singeUserRef(colID: string, docID: string){
    return doc(collection(this.firestore,colID), docID);
  }


}

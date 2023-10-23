import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { DocumentData, Firestore, collection, deleteDoc, doc, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  allUsers: DocumentData[] = [];
  currentUserID: string = '';
  firestore: Firestore = inject(Firestore);
  unsubUsers;

  constructor(public dialog: MatDialog) {
    this.unsubUsers = this.subUsers();
  }

  //----Subscribe-Functions----//
  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      const currentUsers: DocumentData[] = [];
      list.forEach(element => {
        currentUsers.push({ data: element.data(), id: element.id });
      });
      this.allUsers = currentUsers;
    });
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  getCleanJson(currentuser: User): {} {
    return {
      amount: currentuser.amount,
      company: currentuser.company,
      email: currentuser.email,
      street: currentuser.street,
      zipCode: currentuser.zipCode,
      city: currentuser.city,
    };
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  singeUserRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

  deleteUser(i: any, event: Event) {
    event.stopPropagation();
    let id = this.allUsers[i]['id'];
    deleteDoc(doc(this.firestore, 'users', id));
  }

}

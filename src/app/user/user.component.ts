import { Component, inject } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { DocumentData, Firestore, collection, doc, onSnapshot} from '@angular/fire/firestore';

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
  }


  getCleanJson(currentuser: User) : {}{
    return {
      firstName: currentuser.firstName,
      lastName: currentuser.lastName,
      birthDate: currentuser.birthDate,
      email: currentuser.email,
      street: currentuser.street,
      zipCode: currentuser.zipCode,
      city: currentuser.city,
     
  };
  }

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

import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  @ViewChild('companyName') companyName!: ElementRef;

  user = new User();
  loading = false;
  firestore: Firestore = inject(Firestore);
  unsubUsers;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.unsubUsers = this.subUsers();
  }

  //----Save new User----//
  /**
   * At first get the current date. After that a short load animation will appear at the top of the box. During this time the data get changed to a JSON before it will be pushed in the Firestore database.
   * If something went wrong, it will appear in the console. The setTimeout will stop the loading animation and close the window.
   */
  async saveNewUser() {
    if (this.user.company.length <= 0) {
      alert('Please, add the name of the company.');
      return
    } else if (this.user.email.length <= 0) {
      alert('Please, add the email-adress of the company.');
    }
    else {
      this.currentDate();
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
  }

  //----Date----//

  /**
   * Get the current date, which will displayed at "Member since".
   */
  currentDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    return this.user.membersince = `${day}.${month}.${year}`;
  }

  dialogClose() {
    this.dialogRef.close();
  }

  //----Subscribe-Functions-> Firebase----//

  subUsers() {
    return onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
      });
    })
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }



}

import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserNameEmailComponent } from '../dialog-edit-user-name-email/dialog-edit-user-name-email.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  collectionInstance: any;
  userData: DocumentData[] = []
  firestore: Firestore = inject(Firestore);
  unsubUserDetail;
  unsubRouteId;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.unsubUserDetail = this.subUserDetail();
    this.unsubRouteId = this.subRouteId();

  }

  subRouteId() {

    this.route.params.subscribe(paramsId => {
      this.userId = paramsId['id'];
      console.log(this.userId);
    });
  }

  subUserDetail() {
    this.collectionInstance = onSnapshot(this.usersRef(), (list) => {
      list.forEach(element => {
        if (element.id == this.userId) {
          this.userData.push(element.data());
          console.log(this.userData);
        }
      })
    })
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUserDetail;
    this.unsubRouteId;
  }

  openDialogEditAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.userData = this.userData
    
  }

  
  openDialogEditNameEmail() {
    const dialog = this.dialog.open(DialogEditUserNameEmailComponent);
    dialog.componentInstance.userData = this.userData
  }
}





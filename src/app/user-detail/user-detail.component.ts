import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserNameEmailComponent } from '../dialog-edit-user-name-email/dialog-edit-user-name-email.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  user = new User;
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
          this.user = this.userData[0] as User
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
    dialog.componentInstance.userData = new User(this.user);
    dialog.componentInstance.userId = this.userId;

  }

  openDialogEditNameEmail() {
    const dialog = this.dialog.open(DialogEditUserNameEmailComponent);
    dialog.componentInstance.userData = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  name!: string;
  position!: number;
  price!: number;
  sales!: string;

  
data = [
  {position: 1, name: 'Gaming Grafikkarte', price: '1399€'},
  {position: 2, name: 'Grafikkarte normal', price: '499€'},
  {position: 3, name: 'Curved 4k Monitor', price: '349€'},
  {position: 4, name: 'HDMI Monitor', price: '179€' },
  {position: 5, name: 'Mechanische Tastatur', price: '99€'},
  {position: 6, name: 'Silent Tastatur', price: '19€' },
  {position: 7, name: 'RGB Maus', price: '39€'},
  {position: 8, name: '8GB Ram', price: '49€',},
  {position: 9, name: 'NextGen Prozessor', price: '399€', },
  {position: 10, name: 'Wasserkühlung RGB neu Model 2023', price: '89€', },
]

  displayedColumns: string[] = ['position', 'name', 'price'];
  dataSource = this.data;


}





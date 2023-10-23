import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  firestore: Firestore = inject(Firestore);
  users!: any[];
  labelsValue!: any[];
  dataValue!: number[];
  barChartColors = ['rgba(255, 0, 0, 1)',
    'rgba(0, 205, 0, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 205, 0, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(0, 255, 255, 1)',
    'rgba(128, 0, 0, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(0, 0, 128, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(128, 0, 128, 1)',
    'rgba(0, 128, 128, 1)',
    'rgba(192, 192, 192, 1)',
    'rgba(128, 128, 128, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(0, 128, 64, 1)',
    'rgba(128, 64, 0, 1)',
    'rgba(0, 64, 128, 1)',
    'rgba(128, 0, 64, 1)',
    'rgba(64, 0, 128, 1)'];
  barChartData: any;
  unsubUsers;

  constructor() {
    this.unsubUsers = this.subUser();
  }

  //----Subscribe-Functions----//
  subUser() {
    return onSnapshot(this.usersRef(), (list) => {
      let currentUser: DocumentData[] = [];
      list.forEach(element => {
        currentUser.push({ data: element.data() });
      });
      this.users = currentUser;

      this.getAmountPerCompany();
      this.getCompanyNames();
    });
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }

   //----Data for Charts----//
  getAmountPerCompany() {
    this.dataValue = [];
    for (let i = 0; i < this.users.length; i++) {
      let value = 0;
      let company = this.users[i]['data']['amount']
      for (let a = 0; a < company.length; a++) {
        value += company[a]
      }
      this.dataValue.push(value);
    }
  }

  getCompanyNames() {
    this.labelsValue = [];
    this.users.forEach(user => {
      let companyName = user['data']['company'];
      if (companyName.length >= 3) {
        this.labelsValue.push(companyName.substring(0, 5));
      } else {
        this.labelsValue.push(companyName);
      }
    });
    this.getChartData();
  }

  getChartData() {
    if (this.labelsValue.length > 0) {
      this.barChartData = {
        labels: this.labelsValue,
        datasets: [{
          data: this.dataValue,
          label: 'Buyed products per company',
          backgroundColor: this.barChartColors,

        }
        ]
      }
    }
  }

}

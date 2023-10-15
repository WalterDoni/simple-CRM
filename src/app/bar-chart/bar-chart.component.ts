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
  barChartData: any;
  unsubUsers;

  constructor() {
    this.unsubUsers = this.subUser();
  }

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

  getCompanyNames() {
    this.labelsValue = [];
    this.users.forEach(name => {
      this.labelsValue.push(name['data']['company']);
    });
    this.getChartData()
  }

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

  getChartData() {
    if (this.labelsValue.length > 0) {
      this.barChartData = {
        labels: this.labelsValue,
        datasets: [{
          data: this.dataValue,
          label: 'Buyed products per company',
          backgroundColor: [
            'rgba(255, 0, 25, 0.7)',
            'rgba(25, 50, 68, 0.7)',
            'rgba(215, 74, 55, 0.7)',
            'rgba(55, 88, 225, 0.7)',
            'rgba(11, 23, 58, 0.7)',
            'rgba(26, 44, 74, 0.7)',
            'rgba(255, 0, 25, 0.7)',
            'rgba(25, 50, 68, 0.7)',
            'rgba(215, 74, 55, 0.7)',
            'rgba(55, 88, 225, 0.7)',

          ],

        }
        ]
      }
    }
  }

}

import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  firestore: Firestore = inject(Firestore);
  users!: any[];
  dataValue!: number[];
  labelValue = ["Gaming Grafikkarte", "Grafikkarte normal", "Curved 4k Monitor", "HDMI Monitor", "Mechanische Tastatur", "Silent Tastatur", "RGB Maus", "8GB Ram", "NextGen Prozessor", "Wasserkühlung RGB neu Model 2023"];
  lineChartData: any;
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
      this.getSalesPerProduct();
      this.getChartData();
    });
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  getSalesPerProduct() {

    this.dataValue = [];
    for (let i = 0; i < this.labelValue.length; i++) {
      let value = 0;
      for (let a = 0; a < this.labelValue.length; a++) {
        value += this.users[a]['data']['amount'][i];
      }
      this.dataValue.push(value);
    }
    console.log(this.dataValue);

  }



getChartData(){
  
  this.lineChartData = {
    labels: this.labelValue,
    datasets: [{
      data: this.dataValue,
      label: 'Product sales',
      fill: true,
      backgroundColor: 'green',
      borderColor: 'black',
      tension: 0.5,
    }
    ]
  }
}

}

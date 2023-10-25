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
  labelValue = ["GaGr", "Gr no", "Curved", "HDMI", "MecTas", "SilTas", "Maus", "Ram", "NexPro", "Wassküh"];
  lineChartData: any;
  unsubUsers;


  constructor() {
    this.unsubUsers = this.subUser();
  }

  //----Subscribe-Functions-> Firebase----//
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

  //----Data for Charts----//

  /**
   * Iterate through ever available product and get the total amount of sold products.
   */
  getSalesPerProduct() {
    this.dataValue = [];
    this.labelValue.forEach((_, i) => {
      let value = 0;
      this.users.forEach(user => {
        value += user.data.amount[i];
      });
      this.dataValue.push(value);
    });
  }

  /**
 * Collect every necessary data for the chart. 
 */
  getChartData() {
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

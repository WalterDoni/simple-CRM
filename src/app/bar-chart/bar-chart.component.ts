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
  label!: any[];
  ladeldate = ['PC-Rettung', 'Pixelclub', 'GamingHausen', 'Spielekeller', 'Healthpotion Bar', 'Die Computerbastler', 'TechMax', 'Elektroverleih', 'Die Computer-Ambulanz', 'E.sports-Bar-Lex']
  unsubUsers;

  constructor(){
    this.unsubUsers = this.subUser();
 
  }

  subUser(){
    return onSnapshot(this.usersRef(), (list) =>{
      let currentUser: DocumentData[] = [];
      list.forEach(element => {
        currentUser.push({ data: element.data()});
      });
      this.users = currentUser;
      this.getCompanyNames();
    });
  }

  usersRef(){
    return collection(this.firestore, 'users');
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  getCompanyNames() {
  
    this.label = [];
  
    this.users.forEach(name => {
      this.label.push(name['data']['company']);
    });
  
    console.log(this.label);
    console.log(this.ladeldate);
  }
  
  barChartData = {
    labels: this.ladeldate,
    datasets: [{
     data: [89,54,23,65,43,76,45,68,98,12],
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
     
     ] ,
     
      }
    ]
   }
 
}

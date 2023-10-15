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

 

  constructor(){

  }














  lineChartData = {
   labels: ["Gaming Grafikkarte","Grafikkarte normal","Curved 4k Monitor","HDMI Monitor","Mechanische Tastatur","Silent Tastatur","RGB Maus","8GB Ram","NextGen Prozessor","Wasserkühlung RGB neu Model 2023"],
   datasets: [{
    data: [15,45,33,20,44,60,33,81,10,63],
    label: 'Product sales',
    fill: true,
    backgroundColor: 'green' ,
    borderColor: 'black',
    tension: 0.5,
     }
   ]
  }

}

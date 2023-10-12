import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  barChartData = {
    labels: ["Sun","Sun","Sun","Sun","Sun","Sun"],
    datasets: [{
     data: [89,54,23,65,43,76],
     label: 'Name',
     backgroundColor: [
      'rgba(255, 0, 25, 0.7)',
      'rgba(25, 50, 68, 0.7)',
      'rgba(215, 74, 55, 0.7)',
      'rgba(55, 88, 225, 0.7)',
      'rgba(11, 23, 58, 0.7)',
      'rgba(26, 44, 74, 0.7)',
     ] ,
     
      }
    ]
   }
 
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent {
  pieChartData = {
    labels: ["Gaming Grafikkarte","Grafikkarte normal","Curved 4k Monitor","HDMI Monitor","Mechanische Tastatur","Silent Tastatur","RGB Maus","8GB Ram","NextGen Prozessor","Wasserkühlung RGB neu Model 2023"],
    datasets: [{
     data: [1399,499,349,179,99,19,39,49,399,89],
     label: 'Price per product',
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

   pieChartOptions = {
    responsive: false,
   }
}
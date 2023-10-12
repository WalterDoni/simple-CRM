import { Component } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  lineChartData = {
   labels: ["Sun","Sun","Sun","Sun","Sun","Sun"],
   datasets: [{
    data: [89,54,23,65,43,76],
    label: 'Name',
    fill: true,
    backgroundColor: 'green' ,
    borderColor: 'black',
    tension: 0.5,
     }
   ]
  }

}

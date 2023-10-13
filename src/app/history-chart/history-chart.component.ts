import { Component } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})


export class HistoryChartComponent {

  name!: string;
  position!: number;
  price!: number;
  sales!: string;

  
data = [
  {position: 1, name: 'Gaming Grafikkarte', price: '1399€', sales: '15'},
  {position: 2, name: 'Grafikkarte normal', price: '499€', sales: '45'},
  {position: 3, name: 'Curved 4k Monitor', price: '349€', sales: '33'},
  {position: 4, name: 'HDMI Monitor', price: '179€', sales: '20'},
  {position: 5, name: 'Mechanische Tastatur', price: '99€', sales: '44'},
  {position: 6, name: 'Silent Tastatur', price: '19€', sales: '60'},
  {position: 7, name: 'RGB Maus', price: '39€', sales: '33'},
  {position: 8, name: '8GB Ram', price: '49€', sales: '81'},
  {position: 9, name: 'NextGen Prozessor', price: '399€', sales: '10'},
  {position: 10, name: 'Wasserkühlung RGB neu Model 2023', price: '89€', sales: '63'},
]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data;

}






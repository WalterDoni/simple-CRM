import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductNamePriceService {

  constructor() { }

  public productNames = ['Gaming Grafikkarte','Grafikkarte normal','Curved 4k Monitor','HDMI Monitor','Mechanische Tastatur','Silent Tastatur','RGB Maus','8GB Ram','NextGen Prozessor','Wasserkühlung RGB neu Model 2023']
  public productPrices = [1399,499,349,179,99,19,39,49,399,89]

  getName(){
    return this.productNames 
  }

  getPrice(){
    return this.productPrices 
  }

}

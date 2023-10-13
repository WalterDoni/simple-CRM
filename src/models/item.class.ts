export class Items {

  amount!: number;
  price!: number;
  

  toJSON(): any {
    return {
      amount: this.amount,
      price: this.price,
     
    };
  }

  // ? -> allows to create json without any input
  constructor(obj?: any) {
    this.amount = obj ? obj.amount : ''; //fast if / else request --> if obj exist obj.firstname else ''
    this.price = obj ? obj.price : '';
  }

}


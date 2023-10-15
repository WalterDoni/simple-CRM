export class Items {

  amount!: number;
  price!: number;
  

  toJSON(): any {
    return {
      amount: this.amount,
      price: this.price,
     
    };
  }

   constructor(obj?: any) {
    this.amount = obj ? obj.amount : ''; 
    this.price = obj ? obj.price : '';
  }

}



export class User {
  
  amount!: number[];
  company!: string;
  email!: string;
  membersince!: string;
  street!: string;
  zipCode!: number;
  city!: string;
  id: any;

  toJSON(): any {
    return {
      amount: this.amount,
      company: this.company,
      email: this.email,
      membersince: this.membersince,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city
    };
  }

  // ? -> allows to create json without any input
  constructor(obj?: any) {
    this.amount = obj ? obj.amount : [0,0,0,0,0,0,0,0,0,0]; 
    this.company = obj ? obj.company : ''; //fast if / else request --> if obj exist obj.firstname else ''
    this.email = obj ? obj.email : '';
    this.membersince = obj ? obj.membersince : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

}


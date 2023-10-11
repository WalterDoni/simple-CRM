
export class User {

  firstName!: string;
  lastName!: string;
  email!: string
  birthDate!: number;
  street!: string;
  zipCode!: number;
  city!: string;
  id: any;

  toJSON(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city
    };
  }

  // ? -> allows to create json without any input
  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : ''; //fast if / else request --> if obj exist obj.firstname else ''
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

}


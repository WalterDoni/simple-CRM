import { CollectionReference, DocumentData } from "@angular/fire/firestore";

export class User {
   
    firstName!: string;
    lastName!: string;
    birthDate!: number;
    street!: string;
    country!: string;
    zipCode!: number;
    city!: string;
  id: any;

    toJSON(): any {
      return {
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          street: this.street,
          country: this.country,
          zipCode: this.zipCode,
          city: this.city
      };
  }

    // ? -> allows to create json without any input
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : ''; //fast if / else request --> if obj exist obj.firstname else ''
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.country = obj ? obj.country : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

}


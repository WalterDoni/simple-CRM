export class User {
    firstName!: string;
    lastName!: string;
    birthDate!: number;
    street!: string;
    country!: string;
    zipCode!: number;
    city!: string;

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


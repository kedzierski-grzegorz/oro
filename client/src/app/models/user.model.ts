export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  role!: 'ADMIN' | 'USER';
  email!: string;
  password!: string;
  birthDate!: Date;
}

export class UserSession {
  id!: number;
  role!: 'ADMIN' | 'USER';
  token!: string;
  email!: string;
  fullName!: string;
}

export interface IUser {
  name: string;
  tel: string;
  email: string;
  password: string;
  address: string;
  postIndex: string;
  role: 'Admin' | 'User';
}

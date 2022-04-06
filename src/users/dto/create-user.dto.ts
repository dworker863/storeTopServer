export class CreateUserDto {
  readonly username: string;
  readonly tel: string;
  readonly email: string;
  readonly password: string;
  readonly address: string;
  readonly postIndex: string;
  readonly role: 'Admin' | 'User';
}

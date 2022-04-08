export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly city: string;
  readonly street: string;
  readonly houseNumber: string;
  readonly floor: string;
  readonly flatNumber: string;
  readonly postIndex: string;
  readonly role: 'Admin' | 'User';
}

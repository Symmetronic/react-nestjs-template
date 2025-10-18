export class User {
  readonly id: string;
  readonly email: string;
  readonly password: string;

  constructor({
    id,
    email,
    password,
  }: {
    id: string;
    email: string;
    password: string;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

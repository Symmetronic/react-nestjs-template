import { User } from "@/features/user/entities/user.entity";

export class UserDao {
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

  toEntity(): User {
    return new User({
      id: this.id,
      email: this.email,
      password: this.password,
    });
  }
}

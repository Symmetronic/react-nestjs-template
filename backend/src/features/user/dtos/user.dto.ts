import { User } from "@/features/user/entities/user.entity";

export class UserDto {
  /**
   * User's email address
   * @example "user@example.com"
   */
  readonly email: string;

  /**
   * User's unique identifier
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  readonly id: string;

  /**
   * User's password
   * @example "strongPassword123"
   */
  readonly password: string;

  constructor({
    email,
    id,
    password,
  }: {
    email: string;
    id: string;
    password: string;
  }) {
    this.email = email;
    this.id = id;
    this.password = password;
  }

  static fromEntity({ email, id, password }: User) {
    return new UserDto({
      email,
      id,
      password,
    });
  }
}

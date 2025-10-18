import constants from "@/constants/constants";
import { IsEmail, MinLength } from "class-validator";

export class LoginRequestDto {
  /**
   * User's email address
   * @example "user@example.com"
   */
  @IsEmail()
  readonly email: string;

  /**
   * User's password
   * @example "strongPassword123"
   */
  @MinLength(constants.PASSWORD_MIN_LENGTH)
  readonly password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }
}

import { UserService } from "@/features/user/user.service";
import { Result } from "@/types/result.type";
import { errorResult } from "@/utils/error-result.util";
import { successResult } from "@/utils/success-result.util";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<string>> {
    const { data: user, error } = await this.userService.findUserByEmail(email);

    if (error) {
      return errorResult(error.message);
    }

    if (user?.password !== password) {
      return errorResult("Invalid credentials");
    }

    return successResult(user.id);
  }
}

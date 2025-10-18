import { database } from "@/databases/mock.database";
import { User } from "@/features/user/entities/user.entity";
import { Result } from "@/types/result.type";
import { errorResult } from "@/utils/error-result.util";
import { successResult } from "@/utils/success-result.util";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

@Injectable()
export class UserService {
  async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<User>> {
    const id = randomUUID();
    const user = await database.createUser({ email, id, password });

    if (!user) {
      return errorResult("User creation failed");
    }

    return successResult(user.toEntity());
  }

  async findUserByEmail(email: string): Promise<Result<User>> {
    const user = await database.findUserByEmail(email);

    if (!user) {
      return errorResult("User not found");
    }

    return successResult(user.toEntity());
  }

  async findUserById(id: string): Promise<Result<User>> {
    const user = await database.findUserById(id);

    if (!user) {
      return errorResult("User not found");
    }

    return successResult(user.toEntity());
  }
}

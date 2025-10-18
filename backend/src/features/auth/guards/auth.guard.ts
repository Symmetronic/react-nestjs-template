import { UserDto } from "@/features/user/dtos/user.dto";
import { UserService } from "@/features/user/user.service";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<
      Request & {
        cookies?: Record<string, string>;
        user: UserDto | undefined;
      }
    >();

    const userId = request.cookies?.["token"];

    if (!userId) {
      throw new UnauthorizedException("No auth token");
    }

    const { data: user, error } = await this.userService.findUserById(userId);

    if (error || !user) {
      throw new UnauthorizedException("Invalid auth token");
    }

    request["user"] = UserDto.fromEntity(user);

    return true;
  }
}

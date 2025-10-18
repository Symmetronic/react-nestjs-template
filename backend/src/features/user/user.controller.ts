import { CurrentUser } from "@/decorators/current-user.decorator";
import { AuthGuard } from "@/features/auth/guards/auth.guard";
import { CreateUserDto } from "@/features/user/dtos/create-user.dto";
import { UserDto } from "@/features/user/dtos/user.dto";
import { UserService } from "@/features/user/user.service";
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @remarks This operation allows the creation of a user
   *
   * @throws {500} Internal Server Error
   */
  @Post()
  async postUser(@Body() { email, password }: CreateUserDto): Promise<UserDto> {
    const { data: user, error } = await this.userService.createUser({
      email,
      password,
    });

    if (error) {
      throw new InternalServerErrorException("Failed to create test user");
    }

    return UserDto.fromEntity(user);
  }

  /**
   * @remarks Return the currently authenticated user. Protected by cookie-based token.
   */
  @Get("current")
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}

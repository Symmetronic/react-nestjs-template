import { AuthService } from "@/features/auth/auth.service";
import { LoginRequestDto } from "@/features/auth/dtos/login-request.dto";
import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { CookieOptions, Response } from "express";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @remarks This operation allows a user to log in using their email and password.
   *
   * @throws {401} Unauthorized
   * @throws {500} Internal Server Error
   */
  @Post("login")
  async postLogin(
    @Body() loginRequest: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { data: userId, error } = await this.authService.login(loginRequest);

    if (error) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax",
      maxAge: 3600 * 1000,
      path: "/",
    };

    response.cookie("token", userId, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      maxAge: cookieOptions.maxAge,
      path: cookieOptions.path,
    });
  }
}

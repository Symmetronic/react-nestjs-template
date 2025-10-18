import { AuthController } from "@/features/auth/auth.controller";
import { AuthService } from "@/features/auth/auth.service";
import { AuthGuard } from "@/features/auth/guards/auth.guard";
import { UserModule } from "@/features/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}

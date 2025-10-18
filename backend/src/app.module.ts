import { AuthModule } from "@/features/auth/auth.module";
import { HealthModule } from "@/features/health/health.module";
import { UserModule } from "@/features/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AuthModule, UserModule, HealthModule],
  providers: [],
})
export class AppModule {}

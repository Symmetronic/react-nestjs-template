import { UserController } from "@/features/user/user.controller";
import { UserService } from "@/features/user/user.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

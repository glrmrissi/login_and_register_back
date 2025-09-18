import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { User } from "src/entities/user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"

@Module({
    imports: [TypeOrmModule.forFeature([User]), 
    JwtModule.register({
        secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
})
export class AuthModule {}
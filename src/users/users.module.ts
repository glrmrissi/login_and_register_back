import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "./users.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    providers: [UserService],
    controllers: [UserController],
    exports: []
})


export class UserModule{}
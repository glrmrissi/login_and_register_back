import { Module } from "@nestjs/common";
import { UserModule } from "./users.module";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports: [UserModule],
    providers: [UserService],
    controllers: [UserController]
})

export class UserHttpModule {}
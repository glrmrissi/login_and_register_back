import { Body, Controller, Delete, Get, Param, UseInterceptors } from "@nestjs/common";
import { UserService } from "./users.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.findAll()
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findOne(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.remove(id)
    }
}
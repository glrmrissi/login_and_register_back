import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('users')
export class UserController{
    constructor( private readonly userService: UserService){}
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
import { Controller, Delete, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor( private readonly userService: UserService){}
    @Get()
    getUsers() {
        return this.userService.findAll()
    }

    @Get(':id')
    getUser(id: number) {
        return this.userService.findOne(id)
    }

    @Delete(':id')
    deleteUser(id: number) {
        return this.userService.remove(id)
    }
}
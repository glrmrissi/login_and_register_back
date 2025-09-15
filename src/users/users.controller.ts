import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";

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

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return await this.userService.create(createUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.remove(id)
    }
}
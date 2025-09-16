import { Body, Controller, Delete, Get, Param, Post, UnauthorizedException, UseInterceptors } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Get all users
    @Get()
    getUsers() {
        return this.userService.findAll()
    }

    // Get user by id
    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findOne(id)
    }

    // Create a new user
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return await this.userService.create(createUserDto);
    }

    // Login user
    @Post('login')
    async login(@Body() { name, email, password }: { name: string, email: string, password: string }) {
        const user = await this.userService.validateUser({ name, email, password });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    // Delete user by id
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.remove(id)
    }
}
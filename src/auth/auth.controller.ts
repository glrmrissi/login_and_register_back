import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";

@UseInterceptors(LogInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return await this.authService.create(createUserDto);
    }

    @Get('login')
    async login(){
        console.log("Login route");
    }

    // @Post('login')
    // async login(@Body() { email, password }: { email: string, password: string }) {
    //     const user = await this.authService.validateUser({ email, password });
    //     if (!user) {
    //         throw new UnauthorizedException('Invalid credentials');
    //     }
    //     return user;
    // }
}
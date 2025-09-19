import { Body, Controller, Get, Post, UseInterceptors, Headers, BadRequestException } from "@nestjs/common";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { LoginDTO } from "src/users/dto/login-dto";

@UseInterceptors(LogInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return await this.authService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() { email, password }: LoginDTO) {
        return this.authService.validateUser({ email, password });
    }

    @Get('validar')
    validarToken(@Headers('authorization') authHeader: string) {
        if (!authHeader) {
            throw new BadRequestException('Token não enviado');
        }

        const token = authHeader.split(' ')[1];

        const valido = this.authService.isValidToken(token);
        return { valido };
    }
}
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) throw new UnauthorizedException('Token não enviado');

        const token = authHeader.split(' ')[1];

        if (!this.authService.isValidToken(token)) {
            throw new UnauthorizedException('Token inválido');
        }

        return true;
    }
}

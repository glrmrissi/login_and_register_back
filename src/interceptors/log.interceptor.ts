import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


// Interceptor para logar todas as requisições

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();

        const dt = Date.now();

        return next.handle().pipe(tap(() => {
            console.log(
                `\x1b[36m[Application]\x1b[0m - \x1b[35m[${request.method}]\x1b[0m - \x1b[32mURL:\x1b[0m ${request.url}    Execução levou: \x1b[33m${Date.now() - dt}ms\x1b[0m.`
            );
        }))
    }
}
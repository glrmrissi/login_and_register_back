import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsNumber, IsEnum } from "class-validator";
import { Role } from "../../enums/role.enum";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0,
    })
    password: string;

    @IsEnum(Role)
    role: Role;
}
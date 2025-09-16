import { Injectable } from "@nestjs/common";
import { LoginDTO } from "src/users/dto/login-dto";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: "https://localhost:3000",
                audience: "https://localhost:3000"
            })
        }
    }


    async create({ name, email, password, role }: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt()

        password = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({ name, email, password, role });
        return this.userRepository.save(user);
    }

    async validateUser({ email, password }: LoginDTO) {
        const user = await this.userRepository.findOneBy({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            const payload = { sub: user.id, email: user.email };
            return {
                access_token: this.jwtService.sign(payload, { expiresIn: "1h" }),
            };
        }
        return null;
    }
}
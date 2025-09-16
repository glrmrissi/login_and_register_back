import { Injectable } from "@nestjs/common";
import { LoginDTO } from "src/users/dto/login-dto";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { CreateUserDTO } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

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
                access_token: jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" }),
            };
        }
        return null;
    }
}
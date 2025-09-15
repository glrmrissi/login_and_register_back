import * as bcrypt from 'bcrypt';
import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from './dto/login-dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {

    // Todo: Add bcrypt to hash passwords and new migration to update existing passwords and create new methods.

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findOne(@Param('id') id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id })
    }

    async create({ name, email, password, role }: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt()
        
        password = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({ name, email, password, role });
        return this.userRepository.save(user);
    }
    
    async validateUser({ email, password }: LoginDTO) {
        const user = await this.userRepository.findOneBy({ email });
        if (user && await bcrypt.compare(password, user.password)) { // TODO: Use bcrypt to hash and compare passwords and create a new database migration to update existing passwords
            // return user;
            // For security reasons, do not return the password
            const { password, ...result } = user;
            return result;
        }
        if (user && password) {
            return user;
        }
        return null;
    }

    async remove(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
import * as bcrypt from 'bcrypt';
import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from './dto/login-dto';

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
        const user = this.userRepository.create({ name, email, password, role });
        return this.userRepository.save(user);
    }
    
    async validateUser({ email, password }: LoginDTO): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        // if (user && await bcrypt.compare(password, user.password)) { // TODO: Use bcrypt to hash and compare passwords and create _ 
        // new database migration to update existing passwords
        if (user && password) {
            return user;
        }
        return null;
    }

    async remove(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
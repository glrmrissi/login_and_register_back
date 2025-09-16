import * as bcrypt from 'bcrypt';
import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from './dto/login-dto';
import jwt from "jsonwebtoken";

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

    async remove(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
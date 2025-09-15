import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
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

    async remove(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
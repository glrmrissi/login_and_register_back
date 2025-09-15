import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findOne(@Param('id') id: number): Promise<User | null>{
        return this.userRepository.findOneBy({id})
    }

    async remove(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'createdat' })
    createdat: Date;

    @UpdateDateColumn({ name: 'updatedat' })
    updatedat: Date;

    @Column({ type: 'int', default: 1 })
    role: number;

}
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { KanbanColumns } from "./kanban-columns.entity";

@Entity('boards')
export class KanbanBoard {
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @IsString()
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @Column({ type: 'int', default: 0 })
    created_by: number;

    @OneToMany(() => KanbanColumns, column => column.board)
    columns: KanbanColumns[];
}
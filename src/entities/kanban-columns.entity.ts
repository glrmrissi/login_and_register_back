import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { KanbanBoard } from "./kanban-boards.entity";

@Entity('columns')
export class KanbanColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    ordem: number;

    @ManyToOne(() => KanbanBoard, board => board.columns, { nullable: false })
    @JoinColumn({ name: 'board_id' }) 
    board: KanbanBoard;
}

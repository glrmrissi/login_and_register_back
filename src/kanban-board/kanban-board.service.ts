import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { KanbanBoard } from "src/entities/kanban-boards.entity";
import { KanbanColumns } from "src/entities/kanban-columns.entity";
import { Repository } from "typeorm";
import { KanbanBoardDTO } from "./dto/kanban-board.dto";
import { KanbanColumnsDTO } from "./dto/kanban-columns.dto";


@Injectable()
export class KanbanBoardService {
    constructor(
        @InjectRepository(KanbanBoard)
        private kanbanBoardRepository: Repository<KanbanBoard>,
        @InjectRepository(KanbanColumns)
        private kanbanColumnsRepository: Repository<KanbanColumns>,
    ) { }

    async findAll(): Promise<KanbanBoard[]> {
        return this.kanbanBoardRepository.find()
    }

    async findOne(@Param('id') id: number): Promise<KanbanBoard | null> {
        return this.kanbanBoardRepository.findOne({ where: { id } })
    }

    async createKanbanBoard({ name }: KanbanBoardDTO): Promise<KanbanBoard> {
        const kanbanBoard = this.kanbanBoardRepository.create({ name })
        return this.kanbanBoardRepository.save(kanbanBoard)
    }

    async createColumn({ board_id, nome, ordem }: KanbanColumnsDTO): Promise<KanbanColumns> {
        const column = this.kanbanColumnsRepository.create({
            nome: nome,
            ordem: ordem,
            board: { id: board_id },
        })
        return this.kanbanColumnsRepository.save(column)
    }

    async findColumnById(@Param('id') id: number): Promise<KanbanColumns | null> {
        return this.kanbanColumnsRepository.findOne({ where: { id } })
    }
}
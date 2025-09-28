import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { KanbanColumns } from "src/entities/kanban-columns.entity";
import { Repository } from "typeorm";
import { KanbanColumnsDTO } from "./dto/kanban-columns.dto";

@Injectable()
export class KanbanColumnsService {
    constructor(@InjectRepository(KanbanColumns)
    private kanbanColumnsRepository: Repository<KanbanColumns>,) { }

    async findAllColumns() {
        return this.kanbanColumnsRepository.find()
    }

    async findColumnById(@Param('id') id: number): Promise<KanbanColumns | null> {
        return this.kanbanColumnsRepository.findOne({ where: { id } })
    }

    async createColumn({ board_id, nome, ordem }: KanbanColumnsDTO): Promise<KanbanColumns> {
        const column = this.kanbanColumnsRepository.create({
            nome: nome,
            ordem: ordem,
            board: { id: board_id },
        })
        return this.kanbanColumnsRepository.save(column)
    }

    async updateColumn(id: number, { nome, ordem }: KanbanColumnsDTO): Promise<KanbanColumns | null> {
        const column = await this.kanbanColumnsRepository.findOne({ where: { id } })
        if (!column) {
            return null;
        }
        column.nome = nome;
        column.ordem = ordem;
        return this.kanbanColumnsRepository.save(column);
    }
}
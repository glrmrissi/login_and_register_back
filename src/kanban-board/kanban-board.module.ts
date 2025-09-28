import { Module } from "@nestjs/common";
import { KanbanBoardService } from "./kanban-board.service";
import { KanbanBoardController } from "./kanban-board.controller";
import { AuthModule } from "src/auth/auth.module";
import { KanbanBoard } from "src/entities/kanban-boards.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KanbanColumns } from "src/entities/kanban-columns.entity";

@Module({
    imports: [TypeOrmModule.forFeature([KanbanBoard]),TypeOrmModule.forFeature([KanbanColumns]), AuthModule],
    controllers: [KanbanBoardController],
    providers: [KanbanBoardService],
})

export class KanbanBoardModule { }
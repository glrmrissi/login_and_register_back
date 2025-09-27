import { Module } from "@nestjs/common";
import { KanbanBoardService } from "./kanban-board.service";
import { KanbanBoardController } from "./kanban-board.controller";
import { AuthModule } from "src/auth/auth.module";
import { KanbanBoard } from "src/entities/kanban-boards.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([KanbanBoard]), AuthModule],
    controllers: [KanbanBoardController],
    providers: [KanbanBoardService],
})

export class KanbanBoardModule { }
import { Module } from "@nestjs/common";
import { KanbanColumnsController } from "./kanban-columns.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KanbanColumns } from "src/entities/kanban-columns.entity";
import { AuthModule } from "src/auth/auth.module";
import { KanbanColumnsService } from "./kanban-columns.service";


@Module({
    imports: [TypeOrmModule.forFeature([KanbanColumns]), AuthModule],
    controllers: [KanbanColumnsController],
    providers: [KanbanColumnsService],
})

export class KanbanColumnsModule { }
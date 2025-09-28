import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { KanbanColumnsService } from "./kanban-columns.service";
import { KanbanColumnsDTO } from "./dto/kanban-columns.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller("kanban-columns")
export class KanbanColumnsController {
    constructor(private readonly kanbanColumnsService: KanbanColumnsService,
    ) { }

    @Post("columns")
    createColumn(@Body() kanbanColumnsDTO: KanbanColumnsDTO) {
        return this.kanbanColumnsService.createColumn(kanbanColumnsDTO)
    }

    @Get("columns/:id")
    getColumn(@Param("id") id: number) {
        return this.kanbanColumnsService.findColumnById(id)
    }

    @Get("columns")
    getColumns() {
        return this.kanbanColumnsService.findAllColumns()
    }

    @Put("columns/:id")
    async updateColumn(@Param("id") id: number, @Body() kanbanColumnsDTO: KanbanColumnsDTO) {
        return this.kanbanColumnsService.updateColumn(id, kanbanColumnsDTO)
    }
}
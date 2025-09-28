import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { KanbanBoardDTO } from "./dto/kanban-board.dto";
import { KanbanBoardService } from "./kanban-board.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller("kanban-board")
export class KanbanBoardController {
    constructor(private readonly kanbanBoardService: KanbanBoardService){}

    @Get(":id")
    async getKanbanBoard(@Param("id") id: number) {
        return this.kanbanBoardService.findOne(id)
    }

    @Post()
    async createKanbanBoard(@Body() kanbanBoardDTO: KanbanBoardDTO) {
        return this.kanbanBoardService.createKanbanBoard(kanbanBoardDTO)
    }
}
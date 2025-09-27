import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { KanbanBoardDTO } from "./dto/kanban-board.dto";
import { KanbanBoardService } from "./kanban-board.service";

@Controller("kanban-board")
export class KanbanBoardController {
    constructor(private readonly kanbanBoardService: KanbanBoardService){}
    @Get()
    getAllKanbanBoards() {

    }
    @Get(":id")
    getKanbanBoard(@Param("id") id: number) {
        return this.kanbanBoardService.findOne(id)
    }

    @Post()
    createKanbanBoard(@Body() kanbanBoardDTO: KanbanBoardDTO) {
        return this.kanbanBoardService.createKanbanBoard(kanbanBoardDTO)
    }
}
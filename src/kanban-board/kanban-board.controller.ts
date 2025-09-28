import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { KanbanBoardDTO } from "./dto/kanban-board.dto";
import { KanbanBoardService } from "./kanban-board.service";
import { KanbanColumnsDTO } from "./dto/kanban-columns.dto";

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

    @Post("columns")
    createColumn(@Body() kanbanColumnsDTO: KanbanColumnsDTO) {
        return this.kanbanBoardService.createColumn(kanbanColumnsDTO)
    }

    @Get("columns/:id")
    getColumn(@Param("id") id: number) {
        return this.kanbanBoardService.findColumnById(id)
    }
}
import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class KanbanColumnsDTO {
    @IsNotEmpty()
    @IsNumber()
    board_id: number;
    
    @IsOptional()
    @IsString()
    nome: string;

    @IsNumber()
    ordem: number;
}

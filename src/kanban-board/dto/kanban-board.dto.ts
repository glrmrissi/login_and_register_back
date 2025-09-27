import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class KanbanBoardDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description: string;
    
    @IsNumber()
    created_by: number;
}

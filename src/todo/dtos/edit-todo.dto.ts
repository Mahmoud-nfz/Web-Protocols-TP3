import { IsNotEmpty, Min, MinLength, ValidationArguments, IsOptional, IS_ENUM, IsEnum } from 'class-validator' ;
import { ErrorMessages } from '../errors/messages.errors' ;
import { Statuts } from '../enums/statuts.enum' ;
export class EditTodoDto {
    @IsOptional()
    name : string ;
    @IsOptional()
    @MinLength(10,{
        message: ErrorMessages.TODO_DESCRIPTION_MIN_LENGTH
    })
    description : string ;
    @IsOptional()
    @IsEnum(Statuts)
    statut : Statuts ;
}

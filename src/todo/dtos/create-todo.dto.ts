import { IsNotEmpty, MinLength, ValidationArguments } from 'class-validator' ;
import { ErrorMessages } from '../errors/messages.errors' ;
export class CreateTodoDto {
    @IsNotEmpty()
    name : string ;
    @IsNotEmpty()
    @MinLength(10,{
        message: ErrorMessages.TODO_DESCRIPTION_MIN_LENGTH
    })
    description : string ;
}

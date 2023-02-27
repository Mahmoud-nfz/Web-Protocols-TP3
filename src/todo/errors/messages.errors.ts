import { ValidationArguments } from 'class-validator' ;


export class ErrorMessages {
    static readonly TODO_NOT_FOUND = 'Todo not found' ;
    static readonly TODO_DESCRIPTION_MIN_LENGTH = (args : ValidationArguments) => {
        return `Votre description doit contenir au moins ${args.constraints[0]} caractères`;
    }
    static err(err : Error){
        if(err.message == 'min ')
        return  (args : ValidationArguments) => {
            return `Votre description doit contenir au moins ${args.constraints[0]} caractères`;
        }
    }
}
import { IsNotEmpty, IsOptional, MinLength, ValidationArguments } from 'class-validator' ;
import { Statuts } from '../enums/statuts.enum';
export class SearchQueryDto{
    @IsOptional()
    statut: Statuts ;
    @IsOptional()
    key : string ;
}

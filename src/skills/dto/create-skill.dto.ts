import { IsEmail, IsNotEmpty, MinLength, ValidationArguments } from 'class-validator' ;
import { Cv } from '../../cvs/entities/cv.entity';

export class CreateSkillDto {
    @IsNotEmpty()
    designation: string;

    cvs: Cv[];
}

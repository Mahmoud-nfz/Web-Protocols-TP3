import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { Cv } from 'src/cvs/entities/cv.entity';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    cvs: Cv[];
}

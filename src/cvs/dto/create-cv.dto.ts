import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { Skill } from "src/skills/entities/skill.entity";
import { UserModel } from "src/users/user.model";

export class CreateCvDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    cin: number;

    @IsNotEmpty()
    job: string;

    @IsNotEmpty()
    path: string;

    user: UserModel;

    skills: Skill[];

}

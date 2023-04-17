import { randEmail, randFilePath, randFirstName, randFullName, randJobArea, randJobTitle, randLastName, randNumber, randSkill } from '@ngneat/falso';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvsService } from '../cvs/cvs.service';
import { CreateCvDto } from '../cvs/dto/create-cv.dto';
import { SkillsService } from '../skills/skills.service';
import { UsersService } from '../users/users.service';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const cvsService = app.get(CvsService) ;
    const skillsService = app.get(SkillsService) ;
    const usersService = app.get(UsersService) ;

    const usersNumber = await usersService.countUsers() ;

    for(let i = 0 ; i < 10 ; i ++){
        let skill = new CreateSkillDto() ;
        skill.designation = randSkill() ;
        skill.cvs = await cvsService.findAll() ;
    }

    for(let i = 0 ; i < 10 ; i ++){
        let cv = new CreateCvDto()
        cv.name = randLastName() ;
        cv.firstName = randFirstName() ;
        cv.age = randNumber({ min: 10, max: 100 }) ;
        cv.cin = randNumber({ min: 10, max: 1000 }) ;
        cv.job = randJobTitle() ;
        cv.path = randFilePath() ;
        cv.user = await usersService.find(randNumber({ min: 1, max: usersNumber })) ;
        cv.skills = await skillsService.findAll() ;

        await cvsService.create(cv) ;

        console.log(cv) ;
    }

}
bootstrap();

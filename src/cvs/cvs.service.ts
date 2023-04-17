import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvsService {
	constructor(@InjectRepository(Cv) private readonly cvRepo : Repository<Cv>){}
	create(createCvDto: CreateCvDto) {
		return this.cvRepo.save(createCvDto);
	}

	findAll() {
		return this.cvRepo.find();
	}

	findOne(id: number) {
		return this.cvRepo.findOne({where : {id}});
	}

	update(id: number, updateCvDto: UpdateCvDto) {
		return this.cvRepo.update(id, updateCvDto);
	}

	remove(id: number) {
		return this.cvRepo.delete(id);
	}
}

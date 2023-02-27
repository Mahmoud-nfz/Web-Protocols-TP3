import { Injectable } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto';
import { Statuts } from './enums/statuts.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository} from 'typeorm';
import { SearchQueryDto } from './dtos/search-query.dto';

@Injectable()
export class NewTodoService {
    constructor(@InjectRepository(TodoModel) private readonly todoRepo : Repository<TodoModel>) {}

    getTodos(queryParams : SearchQueryDto){
        if(! queryParams.statut && !queryParams.key)
            return this.todoRepo.find() ;
        return this.todoRepo.find({where : [{statut : queryParams.statut},{name : Like(`%${queryParams.key}%`)},{description: Like(`%${queryParams.key}%`)}]},) ;
    }
    async find(id : number) {
        return await this.todoRepo.findOne({where : {id}}) ;
    }
    delete(id : number){
        return this.todoRepo.softDelete(id) ;
    }
    restore(id : number){
        return this.todoRepo.restore(id) ;
    }
    async create(body : CreateTodoDto) : Promise<TodoModel> {
        const todo = this.todoRepo.create( {
            ...body,
            // dateCreation : new Date(),
            statut : Statuts.EnCours
        }) ;
        console.log(todo) ;
        await this.todoRepo.save(todo) ;
        return todo ;
    }
    async edit(body : EditTodoDto, id : number) : Promise<TodoModel|null> {
        let todo = await this.find(id) ;
        if(!todo)
            return null;
        todo = {...todo, ...body} ;
        return this.todoRepo.save(todo) ;
    }
    async countTodos(){
        // for statut in enum return count
        const counts = {} ;
        const statuts = Object.values(Statuts) ;
        for(let statut of statuts){
            counts[statut] = await this.todoRepo.count({where : {statut : statut}}) ;
        }
        return counts ;
    }

}

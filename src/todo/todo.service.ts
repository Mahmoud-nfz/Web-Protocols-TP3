import { Injectable } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto';
import { Statuts } from './enums/statuts.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';

@Injectable()
export class TodoService {
    private todos : TodoModel[] = [] ;
    constructor(@InjectRepository(TodoModel) private readonly todoRepo : Repository<TodoModel>) {}
    getTodos(){
        return this.todoRepo.find() ;
    }
    async find(id : number) {
        return await this.todoRepo.findOne({where : {id}}) ;
    }
    delete(id : number) : TodoModel[]{
        return this.todos.filter(x => x.id != id) ;
    }
    async create(body : CreateTodoDto, id : string) {
        const todo = this.todoRepo.create( {
            ...body,
            // dateCreation : new Date(),
            statut : Statuts.EnCours
        }) ;
        return await this.todoRepo.save(todo) ;
    }
    edit(body : EditTodoDto, id : number) : TodoModel[] {
        const todo = this.todos.filter(x => x.id == id)[0] ;
        if(!todo)
            return this.todos;
        todo.description = body.description ;
        todo.statut = body.statut ;
        todo.name = body.name ;
        return this.todos.map(prevTodo => {
            if (prevTodo.id === id) {
            return todo;
            }
            return prevTodo;
        });
    }
}

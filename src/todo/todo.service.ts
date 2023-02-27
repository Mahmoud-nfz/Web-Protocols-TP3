import { Injectable } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto';

@Injectable()
export class TodoService {
    find(id : number, todos : TodoModel[]) : TodoModel | null{
        const temp = todos.filter(x => x.id == id) ;
        if(temp.length == 0)
            return null ;
        return temp[0] ;
    }
    delete(id : number, todos : TodoModel[]) : TodoModel[]{
        return todos.filter(x => x.id != id) ;
    }
    create(body : CreateTodoDto, id : number, todos : TodoModel[]) : TodoModel[] {
        const todo = new TodoModel() ;
        todo.description = body.description ;
        todo.name = body.name ;
        todo.dateCreation = new Date() ;
        todo.id = id ;
        todos.push(todo) ;
        return todos ;
    }
    edit(body : EditTodoDto, id : number, todos : TodoModel[]) : TodoModel[] {
        const todo = todos.filter(x => x.id == id)[0] ;
        if(!todo)
            return todos;
        todo.description = body.description ;
        todo.statut = body.statut ;
        todo.name = body.name ;
        return todos.map(prevTodo => {
            if (prevTodo.id === id) {
            return todo;
            }
            return prevTodo;
        });
    }
}

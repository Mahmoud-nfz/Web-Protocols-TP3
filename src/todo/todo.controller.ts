import { Body, Controller, Delete, Get, Param, Patch, Post, Res, Inject} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto'
import { TodoService } from './todo.service';
import { Response } from 'express';

@Controller('todo')
export class TodoController {
    private todos : TodoModel[] = [] ;
    
    constructor(private todoService : TodoService,
        @Inject('UUID') private randomUUID 
    ){}
    @Get()
    getTodos(){
        return this.todos ;
    }
    @Post()
    addTodo(@Body() todoDTO: CreateTodoDto){
        this.todos = this.todoService.create(todoDTO,this.randomUUID(),this.todos) ;
        return this.todos ;
    }
    @Get('/:id')
    findTodo(@Param('id') id : number){
        return this.todoService.find(id,this.todos) ;
    }
    @Delete('/:id')
    deleteTodo(@Param('id') id : number){
        this.todos = this.todoService.delete(id,this.todos) ;
        return this.todos ;
    }
    @Post('/edit/:id')
    editTodo(@Body() body: EditTodoDto, @Param('id') id : number, @Res() res : Response){
        const todo = this.todoService.find(id,this.todos) ;
        if(!todo)
            return res.status(404).send({ error: 'Todo not found' });
        this.todos = this.todoService.edit(body,id,this.todos) ;
        return res.status(200).send(this.todos); ;
    }
}


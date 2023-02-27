import { Body, Controller, Delete, Get, Param, Patch, Post, Res, Inject, UsePipes, ValidationPipe} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto'
import { TodoService } from './todo.service';
import { Response } from 'express';

@Controller({
    path: 'todo',
    version: '1'
})
export class TodoController {
    
    constructor(private todoService : TodoService,
        @Inject('UUID') private randomUUID 
    ){}
    @Get()
    getTodos(){
        return this.todoService.getTodos() ;
    }
    @Post()
    @UsePipes(ValidationPipe)
    addTodo(@Body() todoDTO: CreateTodoDto, @Res() res : Response){
        try{
            return res.status(200).send(this.todoService.create(todoDTO,this.randomUUID())) ;
        }catch(e){
            return res.status(400).send({ error: e.message });
        }
    }
    @Get('/:id')
    findTodo(@Param('id') id : number){
        return this.todoService.find(id) ;
    }
    @Delete('/:id')
    deleteTodo(@Param('id') id : number){
        return this.todoService.delete(id) ;
    }
    @Post('/edit/:id')
    editTodo(@Body() body: EditTodoDto, @Param('id') id : number, @Res() res : Response){
        const todo = this.todoService.find(id) ;
        if(!todo)
            return res.status(404).send({ error: 'Todo not found' });
        return res.status(200).send(this.todoService.edit(body,id));
    }
}


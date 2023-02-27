import { Body, Controller, Delete, Get, Param, Patch, Post, Res, Inject, UsePipes, ValidationPipe, Query} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto'
import { TodoService } from './todo.service';
import { query, Response } from 'express';
import { NewTodoService } from './newtodo.service';
import { Statuts } from './enums/statuts.enum';
import { SearchQueryDto } from './dtos/search-query.dto';

@Controller({
    path: 'todo',
    version: '2'
})
export class TodoDBController {
    
    constructor(private todoService : NewTodoService,
    ){}
    @Get()
    getTodos(@Query() queryParams : SearchQueryDto){
        return this.todoService.getTodos(queryParams) ;
    }

    @Get('/count/')
    async countTodos(){
        return await this.todoService.countTodos();
    }
    @Post()
    @UsePipes(ValidationPipe)
    addTodo(@Body() todoDTO: CreateTodoDto){
        return this.todoService.create(todoDTO) ;
    }
    @Get('/:id')
    async findTodo(@Param('id') id : number,@Res() res : Response){
        const todo = await this.todoService.find(id) ;
        if(!todo)
            return res.status(404).send({ error: 'Todo not found' });
        return res.status(200).send(todo);
    }
    @Delete('/:id')
    deleteTodo(@Param('id') id : number){
        return this.todoService.delete(id) ;
    }
    @Patch('/restore/:id')
    restoreTodo(@Param('id') id : number){
        return this.todoService.restore(id) ;
    }
    @Post('/edit/:id')
    async editTodo(@Body() body: EditTodoDto, @Param('id') id : number, @Res() res : Response){
        const todo = this.todoService.find(id) ;
        if(!todo)
            return res.status(404).send({ error: 'Todo not found' });
        return res.status(200).send(await this.todoService.edit(body,id));
    }
}


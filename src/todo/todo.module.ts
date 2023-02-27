import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewTodoService } from './newtodo.service';
import { TodoController } from './todo.controller';
import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';
import { TodoDBController } from './todoDB.controller';

@Module({
  controllers: [TodoController,TodoDBController],
  providers: [TodoService,NewTodoService],
  imports: [
    TypeOrmModule.forFeature([TodoModel])
  ],
})
export class TodoModule {}

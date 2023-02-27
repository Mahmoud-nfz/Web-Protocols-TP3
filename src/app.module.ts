import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModel } from './todo/todo.model';

@Module({
  imports: [TodoModule, CommonModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[TodoModel],
      synchronize: true,
      logging:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

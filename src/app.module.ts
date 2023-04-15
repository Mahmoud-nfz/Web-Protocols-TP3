import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModel } from './todo/todo.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserModel } from './users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './authentication.middleware';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [TodoModule, CommonModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[TodoModel,UserModel],
      synchronize: true,
      logging:true
    }),
    UsersModule,
    AuthModule, JwtModule.register({
      global: true,
      secret: "dasdsaadsdsaadsdsadsa",
      signOptions: { expiresIn: '3600s' },
    })
  ],
  controllers: [AppController],
  providers: [AppService,AuthenticationMiddleware],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) : MiddlewareConsumer | void {
		consumer
			.apply(AuthenticationMiddleware)
			.forRoutes('v1/todo');
	}
}

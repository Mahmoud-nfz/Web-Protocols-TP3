import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CvsService } from './cvs/cvs.service';
import { CreateCvDto } from './cvs/dto/create-cv.dto';
import { CvsModule } from './cvs/cvs.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({transform: true,
    // whitelist:true
  }));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(3000);
}
bootstrap();

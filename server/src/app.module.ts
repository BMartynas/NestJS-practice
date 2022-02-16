import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { loggerMiddleWare } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesManagerModule } from './files-manager/files-manager.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule, AuthModule, FilesManagerModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(loggerMiddleWare)
        .exclude(
          { path: 'cats', method: RequestMethod.POST },
        )
        .forRoutes(CatsController);
  }
} 

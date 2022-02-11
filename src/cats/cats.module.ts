import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [MyLoggerModule, MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema}]), AuthModule],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {}

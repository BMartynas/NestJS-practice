import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesManagerModule } from 'src/files-manager/files-manager.module';
import { FilesManagerService } from 'src/files-manager/files-manager.service';
import { diskStorage } from 'multer';

@Module({
    imports: [MyLoggerModule, MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema}]), AuthModule,
                MulterModule.registerAsync({
                    imports: [FilesManagerModule],
                    useFactory: async (filesManagerService: FilesManagerService) => ({
                        storage: diskStorage({
                            destination: './uploads',
                            filename: (req, file, callback) => filesManagerService.generateFilename(req, file, callback),
                        }),
                        fileFilter: (req, file, callback) => filesManagerService.checkIfImage(req, file, callback),
                        }),
                    inject: [FilesManagerService]
                })            
],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {}

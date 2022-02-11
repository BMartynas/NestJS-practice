import { Logger, Controller, Get, Req, Post, Put, Delete, HttpCode, Header, Redirect, Query, Param, Body, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/update-cat.dto';
import { diskStorage} from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from  'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}
    private readonly logger = new Logger(CatsController.name);

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat>{
        this.logger.log('GET cat by id was invoked!')
        return this.catsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(id, updateCatDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.catsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                        const filename: string = uuidv4();
                        cb(null, `${filename}${extname(file.originalname)}`);
                    }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
              return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
          }
    }))
    async uploadPicture(@Param('id') id, @UploadedFile() file: Express.Multer.File) {
        this.catsService.setPicture(id, file.filename);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':catId/picture')
    async findPicture(@Param('catId') catId, @Res() res) {
        const cat = await this.catsService.findOne(catId);
        if(cat.picture) {
            res.sendFile(cat.picture, { root: 'uploads'})
        }   else {
                throw new NotFoundException("There isn't a picture uploaded for this cat!")
        }
    }
}
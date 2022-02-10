import { Logger, Controller, Get, Req, Post, Put, Delete, HttpCode, Header, Redirect, Query, Param, Body, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
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

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}
    private readonly logger = new Logger(CatsController.name);

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat>{
        this.logger.log('GET cat by id was invoked!')
        return this.catsService.findOne(id);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(id, updateCatDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.catsService.delete(id);
    }

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

    @Get(':catId/picture')
    async findPicture(@Param('catId') catId, @Res() res) {
        const cat = await this.catsService.findOne(catId);
        if(cat.picture) {
            res.sendFile(cat.picture, { root: 'uploads'})
        }   else {
                this.logger.error("There isn't a picture uploaded for this cat!");    
                res.sendStatus(404);
        }
    }





    // @Get('ab*cd')
    // findAll(@Req() request: Request): string {
    //     return 'This action returns all cats';
    // }

    // @Get('library-specific')
    // @Header('Cache-Control', 'none')
    // findAllv2(@Res({ passthrough: true }) res: Response) {
    //     res.status(HttpStatus.OK);
    //     return [];
    // }

    //http://localhost:3000/cats/cat-redirect?version=5
    // @Get('cat-redirect')
    // @Redirect('https://docs.nestjs.com', 302)
    // getDocs(@Query('version') version) {
    //     if (version && version === '5') {
    //         return { url: 'https://docs.nestjs.com/v5/' };
    //     }
    // }

}

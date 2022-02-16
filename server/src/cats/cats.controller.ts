import { Logger, Controller, Get, Req, Post, Put, Delete, Param, Body, Res, UseInterceptors, UploadedFile, UseGuards, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/update-cat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('cats')
@UseGuards(JwtAuthGuard, RolesGuard)
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

    @Roles(Role.Admin)
    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPicture(@Param('id') id, @UploadedFile() file: Express.Multer.File) {
        this.catsService.setPicture(id, file.filename);
    }

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
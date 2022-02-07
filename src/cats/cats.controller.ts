import { Controller, Get, Req, Post, Put, Delete, HttpCode, Header, Redirect, Query, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat>{
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

import { Controller, Get, Req, Post, Delete, HttpCode, Header, Redirect, Query, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto) {
        // return 'This action adds a new cat';
        this.catsService.create(createCatDto);
    }

    @Get('all')
    async findAllUsingCatsService(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get('ab*cd')
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

    @Get('library-specific')
    @Header('Cache-Control', 'none')
    findAllv2(@Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return [];
    }

    //http://localhost:3000/cats/cat-redirect?version=5
    @Get('cat-redirect')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a ${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a ${id} cat`;
    }

}

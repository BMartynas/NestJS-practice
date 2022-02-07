import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findOne(id: string): Promise<Cat> {
        return this.catModel.findOne({ _id: id }).exec();
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }

    async update(id:string, updateCatDto: UpdateCatDto) {
        return this.catModel.updateOne({ id }, {$set: { ...updateCatDto }})
    }

    async delete(id: string) {
        const deletedCat = await this.catModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedCat;
    }
}

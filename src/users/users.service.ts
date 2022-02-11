import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async register(createUserDto: createUserDto): Promise<User> {
        const registeredUser = new this.userModel(createUserDto);
        return registeredUser.save();
    }

    async findOne(username: string): Promise<User | undefined> {
        const user =  this.userModel.findOne({ username: username }).lean();
        return user;
    }
}

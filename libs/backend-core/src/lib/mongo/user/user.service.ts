import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from '@monorepo/type';
import { User, UserDocument } from '@monorepo/type';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: UserRegisterDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
}

import { User, UserDocument } from '@monorepo/type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findOneByEmail(email);
        if (user && (await user.comparePassword(password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }
}

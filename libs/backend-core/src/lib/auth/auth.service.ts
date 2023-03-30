import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../mongo/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateByPayload(payload: any) {
        const user = await this.validateUser(payload.username, payload.password);

        if (!user) {
            throw new UnauthorizedException();
        }
        user.roles = payload.roles;
        return user;
    }
}

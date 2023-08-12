import {
    Injectable,
    Dependencies,
    UnauthorizedException,
    NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.find({ username });
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        const passwordValid = await bcrypt.compare(password, user.password);

        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async signUp(dto): Promise<any> {
        try {
            const user = await this.usersService.createUser(dto);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
            user: omit(user, 'password'),
        };
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        if (user?.password_hash !== this.userService.hash(password)) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, sub: user.password_hash };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}

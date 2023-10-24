import { Body, Controller, Inject, Post, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() signInDto: Record<string, string>) {
      return this.authService.login(signInDto.email, signInDto.password);
    }
    
}

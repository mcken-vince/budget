import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoesUserExist } from '@guards/does-user-exist.guard';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { UserDto } from '@dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user) {
    const response = await this.authService.login(user);
    return response;
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}

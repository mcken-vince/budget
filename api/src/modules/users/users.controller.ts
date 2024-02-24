import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post('user/create')
  async create(input: any) {
    return this._usersService.create(input);
  }

  @Get('user/email')
  async findOneByEmail(email: string) {
    return this._usersService.findOneByEmail(email);
  }

  @Get('user/id')
  async findOneById(id: number) {
    return this._usersService.findOneById(id);
  }
}

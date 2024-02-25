import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  // @Post('create')
  // async create(@Body() input: any) {
  //   return this._usersService.create(input);
  // }

  // @Get('byEmail')
  // async findOneByEmail(@Body() email: string) {
  //   return this._usersService.findOneByEmail(email);
  // }

  @Get('byId')
  async findOneById(@Body() id: number) {
    return this._usersService.findOneById(id);
  }
}

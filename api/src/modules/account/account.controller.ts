import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountEntity } from '@entities';
import { User } from '@decorators/user.decorator';
import { AccountDto, DeleteResponse } from '@dto';
import { AuthGuard } from '@guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Get()
  findAll(@User() user: any): Promise<AccountEntity[]> {
    return this._accountService.findAll(user.id);
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: number,
  //   @User() user
  // ): Promise<CategoryEntity> {
  //   return this._categoryService.findOne(id, user.id);
  // }

  @Post()
  async create(
    @Body() input: AccountDto,
    @User() user
  ): Promise<AccountEntity> {
    return this._accountService.create(input, user.id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() input: CategoryDto,
  //   @User() user: any
  // ): Promise<CategoryEntity> {
  //   return this._categoryService.update(id, input, user.id);
  // }

  // @Delete(':id')
  // async remove(
  //   @Param('id') id: number,
  //   @User() user: any
  // ): Promise<DeleteResponse> {
  //   return this._categoryService.delete(id, user.id);
  // }
}

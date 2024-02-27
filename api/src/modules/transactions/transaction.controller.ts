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
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionEntity } from '../../core/entities';
import { User } from '../../core/decorators/user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  constructor(private readonly _transactionService: TransactionService) {}

  @Get()
  findAll(@User() user: any) {
    return this._transactionService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @User() user) {
    return this._transactionService.findOne(id, user.id);
  }

  @Post()
  async create(@Body() input: any, @User() user): Promise<TransactionEntity> {
    return this._transactionService.create(input, user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() input: any,
    @User() user: any
  ): Promise<TransactionEntity> {
    return this._transactionService.update(id, input, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: any) {
    await this._transactionService.delete(id, user.id);
  }
}

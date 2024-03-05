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
import { TransactionEntity } from '../../core/entities';
import { User } from '../../core/decorators/user.decorator';
import { TransactionDto } from '../../core/dto/transaction.dto';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DeleteResponse } from '../../core/dto/delete-response.dto';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly _transactionService: TransactionService) {}

  @Get()
  findAll(@User() user: any): Promise<TransactionEntity[]> {
    console.log({ user });
    return this._transactionService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @User() user
  ): Promise<TransactionEntity> {
    return this._transactionService.findOne(id, user.id);
  }

  @Post()
  async create(
    @Body() input: TransactionDto,
    @User() user
  ): Promise<TransactionEntity> {
    return this._transactionService.create(input, user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() input: TransactionDto,
    @User() user: any
  ): Promise<TransactionEntity> {
    return this._transactionService.update(id, input, user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @User() user: any
  ): Promise<DeleteResponse> {
    return this._transactionService.delete(id, user.id);
  }
}

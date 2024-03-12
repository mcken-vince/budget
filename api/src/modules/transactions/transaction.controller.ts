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
import { TransactionEntity } from '@entities';
import { User } from '@decorators/user.decorator';
import { TransactionDto, DeleteResponse } from '@dto';
import { AuthGuard } from '@guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly _transactionService: TransactionService) {}

  @Get()
  findAll(@User() user: any): Promise<TransactionEntity[]> {
    console.log({ user });
    return this._transactionService.findAll(user.id);
  }

  @Get('byDateRange/:startDate/:endDate')
  async findAllByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @User() user: any
  ): Promise<TransactionEntity[]> {
    return this._transactionService.findAllByDateRange(
      { startDate, endDate },
      user.id
    );
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

  @Put(':id/category')
  async updateCategory(
    @Param('id') id: number,
    @Body() input: { idCategory: string },
    @User() user: any
  ): Promise<TransactionEntity> {
    return this._transactionService.updateCategory(id, input, user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @User() user: any
  ): Promise<DeleteResponse> {
    return this._transactionService.delete(id, user.id);
  }
}

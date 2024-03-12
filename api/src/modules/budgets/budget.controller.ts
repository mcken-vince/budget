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
import { BudgetService } from './budget.service';
import { BudgetEntity, TransactionEntity } from '@entities';
import { User } from '@decorators/user.decorator';
import { DeleteResponse, BudgetDto } from '@dto';
import { AuthGuard } from '@guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly _budgetService: BudgetService) {}

  @Get()
  findAll(@User() user: any): Promise<BudgetEntity[]> {
    console.log({ user });
    return this._budgetService.findAll(user.id);
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: number,
  //   @User() user
  // ): Promise<TransactionEntity> {
  //   return this._transactionService.findOne(id, user.id);
  // }

  @Post()
  async create(@Body() input: BudgetDto, @User() user): Promise<BudgetEntity> {
    return this._budgetService.create(input, user.id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() input: TransactionDto,
  //   @User() user: any
  // ): Promise<TransactionEntity> {
  //   return this._transactionService.update(id, input, user.id);
  // }

  // @Delete(':id')
  // async remove(
  //   @Param('id') id: number,
  //   @User() user: any
  // ): Promise<DeleteResponse> {
  //   return this._transactionService.delete(id, user.id);
  // }
}

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
import { BudgetEntity } from '@entities';
import { User } from '@decorators/user.decorator';
import { DeleteResponse, BudgetDto, BudgetItemDto } from '@dto';
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

  @Get(':year/:month')
  async findByDate(
    @Param('year') year: number,
    @Param('month') month: number,
    @User() user
  ): Promise<BudgetEntity> {
    return this._budgetService.findByDate(year, month, user.id);
  }

  @Post()
  async create(@Body() input: BudgetDto, @User() user): Promise<BudgetEntity> {
    return this._budgetService.create(input, user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() input: BudgetDto,
    @User() user: any
  ): Promise<BudgetEntity> {
    return this._budgetService.update(id, input, user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @User() user: any
  ): Promise<DeleteResponse> {
    return this._budgetService.delete(id, user.id);
  }

  @Post('item')
  async createBudgetItem(@Body() input: BudgetItemDto, @User() user: any) {
    return this._budgetService.createBudgetItem(input, user.id);
  }

  @Delete('item/:id')
  async deleteBudgetItem(
    @Param('id') id: number,
    @User() user: any
  ): Promise<DeleteResponse> {
    return this._budgetService.deleteBudgetItem(id, user.id);
  }
}

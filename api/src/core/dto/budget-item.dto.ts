import { IsNumber, IsString, MaxLength } from 'class-validator';

export class BudgetItemDto {
  @IsNumber()
  idBudget: number;

  @IsNumber()
  idCategory: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
}

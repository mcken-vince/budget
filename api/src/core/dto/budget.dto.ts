import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class BudgetDto {
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(255)
  name: string;

  // @IsNotEmpty({ message: 'Start date is required' })
  // @IsDateString()
  // startDate: Date;

  // @IsNotEmpty({ message: 'End date is required' })
  // @IsDateString()
  // endDate: Date;

  @Min(2020)
  @Max(2100)
  @IsNumber()
  year: number;

  @Min(1)
  @Max(12)
  @IsNumber()
  month: number;

  @IsNotEmpty({ message: 'Total amount is required' })
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmount: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  remainingAmount?: number;
}

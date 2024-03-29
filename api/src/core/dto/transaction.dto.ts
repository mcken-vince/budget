import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  IsDateString,
} from 'class-validator';

export class TransactionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly idBudget?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly idCategory?: number;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(255, { message: 'Limit is 255 characters' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Limit is 1000 characters' })
  readonly description?: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString()
  readonly date: Date;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 })
  amount: number;
}

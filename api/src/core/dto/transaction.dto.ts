import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  IsDateString,
  IsIn,
} from 'class-validator';

export class TransactionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  idAccount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  idCategory?: number;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(255, { message: 'Limit is 255 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Limit is 1000 characters' })
  description?: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString()
  date: Date;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 })
  amount: number;

  @IsOptional()
  @IsString()
  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense';
}

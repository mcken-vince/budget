import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  readonly idUser: number;

  readonly idBudget: number;

  readonly idCategory: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  readonly description: string;

  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

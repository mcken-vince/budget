import { IsNumber, IsString, MaxLength } from 'class-validator';

export class AccountDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  initialBalance: number;
}

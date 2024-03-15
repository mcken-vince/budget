import { IsString, MaxLength } from 'class-validator';

export class AccountDto {
  @IsString()
  @MaxLength(50)
  name: string;
}

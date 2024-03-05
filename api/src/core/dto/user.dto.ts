import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'Limit is 255 characters' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'Limit is 255 characters' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

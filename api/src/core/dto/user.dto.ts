import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}

import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class DeleteResponse {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsNumber()
  id?: number;
}

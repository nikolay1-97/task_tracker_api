import { IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  readonly status: string;

}
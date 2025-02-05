import { IsString, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly status: string;

  @IsString()
  readonly deadline: string;

  @IsNumber()
  readonly projectId: number
}
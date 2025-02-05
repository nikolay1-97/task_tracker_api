import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly deadline: string;

  @IsNumber()
  readonly userId: number;
}
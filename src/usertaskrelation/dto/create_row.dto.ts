import { IsNumber } from 'class-validator';

export class CreateRowDto {

  @IsNumber()
  readonly cardId: number;
}
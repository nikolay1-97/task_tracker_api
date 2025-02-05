import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly cardId: number;
}
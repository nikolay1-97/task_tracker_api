import { IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly deadline: string;

}
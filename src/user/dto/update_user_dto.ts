import { IsString } from 'class-validator';

export class UpdateUserDto {
  
  @IsString()
  readonly role: string;
}
import { 
  Controller,
  Get,Param,
  Body, Post,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user_dto';
import { JwtAuthGuards } from 'src/guards/jwtguards';
import { AdminGuards } from 'src/guards/admin/admin_guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuards)
  @Get('/:email')
  async index(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email)
  }

  @UseGuards(AdminGuards, JwtAuthGuards)
  @Post()
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(
      userData.name,
      userData.email,
      userData.password,
      userData.role,
    );
  }

  @UseGuards(AdminGuards, JwtAuthGuards)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.update(id, userData.role);
  }

  @UseGuards(AdminGuards, JwtAuthGuards)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}

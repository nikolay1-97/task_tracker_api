import {
  Controller,
  Get,
  Post,
  Delete,
  Request,
  Body,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsertaskrelationService } from './usertaskrelation.service';
import { JwtService } from '@nestjs/jwt';
import { CreateRowDto } from './dto/create_row.dto';
import { JwtAuthGuards } from 'src/guards/jwtguards';
import { AdminGuards } from 'src/guards/admin/admin_guard'; 


@Controller('usertaskrelation')
export class UsertaskrelationController {
  constructor(
    private readonly usertaskrelationService: UsertaskrelationService,
    private readonly jwtService: JwtService,
  ) {}

    @UseGuards(JwtAuthGuards)
    @Post()
    async create(@Body() dto: CreateRowDto, @Request() req) {
      const token = req.authorization
      const userData = this.jwtService.decode(token)
      return await this.usertaskrelationService.create(userData.id, dto.cardId)
    }

    @UseGuards(JwtAuthGuards, AdminGuards)
    @Delete(':cardId')
    async delete(@Param('cardId', ParseIntPipe) cardId: number) {
      return await this.usertaskrelationService.delete(cardId)
    }

    @UseGuards(JwtAuthGuards)
    @Get(':userId/:status')
    async getByStatus(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('status') status: string,
    ) {
      return await this.usertaskrelationService.getByStatus(userId, status)
    }
}

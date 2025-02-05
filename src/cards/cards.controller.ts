import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service'; 
import { CreateCardDto } from './dto/create_card.dto'; 
import { UpdateCardDto } from './dto/update_card.dto';
import { UpdateStatusDto } from './dto/update_status.dto';
import { JwtAuthGuards } from 'src/guards/jwtguards';
import { AdminGuards } from 'src/guards/admin/admin_guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @UseGuards(JwtAuthGuards)
  @Get('/:id')
  async index(@Param('id', ParseIntPipe) id: number) {
    return await this.cardService.getCardById(id)
  }

  @UseGuards(JwtAuthGuards, AdminGuards)
  @Post()
  async create(@Body() cardData: CreateCardDto) {
    const deadline = new Date(cardData.deadline)
    return await this.cardService.create(
      cardData.title,
      cardData.description,
      cardData.status,
      deadline.toISOString(),
      cardData.projectId,
    );
  }

  @UseGuards(JwtAuthGuards, AdminGuards)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cardData: UpdateCardDto,
  ) {
    const deadline = new Date(cardData.deadline)
    return await this.cardService.update(
      id,
      cardData.title,
      cardData.description,
      cardData.status,
      deadline.toISOString(),
    );
  }

  @UseGuards(JwtAuthGuards, AdminGuards)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cardService.delete(id);
  }

  @UseGuards(JwtAuthGuards)
  @Patch(':id')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() cardData: UpdateStatusDto,
  ) {
    return await this.cardService.changeStatus(
      id,
      cardData.status,
    );
  }
}

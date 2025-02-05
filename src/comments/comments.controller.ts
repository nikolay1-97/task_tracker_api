import { 
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service'; 
import { CreateCommentDto } from './dto/create_comment.dto'; 
import { CommentGuards } from 'src/guards/user/commect_guards';
import { JwtAuthGuards } from 'src/guards/jwtguards';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuards)
  @Get('/:id')
  async index(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.getCommentById(id)
  }

  @UseGuards(JwtAuthGuards)
  @Post()
  async create(@Body() commentData: CreateCommentDto) {
    return await this.commentsService.create(
      commentData.description,
      commentData.userId,
      commentData.cardId,
    );
  }

  @UseGuards(JwtAuthGuards, CommentGuards)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.delete(id);
  }
}

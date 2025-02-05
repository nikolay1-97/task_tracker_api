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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create_project.dto';
import { UpdateProjectDto } from './dto/update_project.dto';
import { ProjectGuards } from 'src/guards/user/project_guards';
import { AdminGuards } from 'src/guards/admin/admin_guard';
import { JwtAuthGuards } from 'src/guards/jwtguards';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuards)
  @Get('/:id')
  async index(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.getProjectById(id)
  }

  @UseGuards(JwtAuthGuards, AdminGuards)
  @Post()
  async create(@Body() projectData: CreateProjectDto) {
    const deadline = new Date(projectData.deadline)
    return await this.projectsService.create(
      projectData.title,
      projectData.description,
      deadline.toISOString(),
      projectData.userId,
    );
  }

  @UseGuards(JwtAuthGuards, AdminGuards, ProjectGuards)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectData: UpdateProjectDto,
  ) {
    const deadline = new Date(projectData.deadline)
    return await this.projectsService.update(
      id,
      projectData.title,
      projectData.description,
      deadline.toISOString(),
    );
  }

  @UseGuards(JwtAuthGuards, AdminGuards, ProjectGuards)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.delete(id);
  }
}

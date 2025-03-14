import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {PrismaService} from '../prisma.service';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}

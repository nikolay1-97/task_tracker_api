import { Module } from '@nestjs/common';
import { UsertaskrelationService } from './usertaskrelation.service';
import { UsertaskrelationController } from './usertaskrelation.controller';
import { PrismaService } from 'src/prisma.service';
import { CardsService } from 'src/cards/cards.service';


@Module({
  controllers: [UsertaskrelationController],
  providers: [UsertaskrelationService, PrismaService, CardsService],
})
export class UsertaskrelationModule {}

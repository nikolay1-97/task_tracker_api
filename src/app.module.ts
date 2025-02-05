import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsertaskrelationModule } from './usertaskrelation/usertaskrelation.module';
import configurations from './configurations';

@Module({
  imports: [UserModule,
    ProjectsModule,
    CardsModule,
    CommentsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations]
    }),
    UsertaskrelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

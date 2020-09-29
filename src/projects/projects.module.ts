import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from 'src/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, GoogleStrategy]
})
export class ProjectsModule {}

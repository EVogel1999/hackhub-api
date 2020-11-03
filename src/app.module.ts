import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // ElasticsearchModule.register({
    //   node: process.env.ELASTIC_CONNECTION_URI,
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: process.env.MONGODB_CONNECTION_URI,
    //   database: process.env.DATABASE,
    //   entities: [
    //     __dirname + '/**/*.entity{.ts,.js}',
    //   ],
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MONGODB_CONNECTION_URI'),
          database: configService.get('DATABASE'),
          entities: [
            __dirname + '/**/*.entity{.ts,.js}',
          ],
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

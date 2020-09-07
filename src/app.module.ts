import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_URI,
      database: process.env.DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

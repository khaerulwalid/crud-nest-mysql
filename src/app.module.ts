import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

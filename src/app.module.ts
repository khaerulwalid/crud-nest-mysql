import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import config from 'config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryProviders } from './category.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders, JwtService],
})
export class CategoryModule {}

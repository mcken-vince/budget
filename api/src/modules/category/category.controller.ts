import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryEntity,
} from '@entities';
import { User } from '@decorators/user.decorator';
import { CategoryDto, DeleteResponse } from '@dto';
import { AuthGuard } from '@guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  findAll(@User() user: any): Promise<CategoryEntity[]> {
    console.log({ user });
    return this._categoryService.findAll(user.id);
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: number,
  //   @User() user
  // ): Promise<CategoryEntity> {
  //   return this._categoryService.findOne(id, user.id);
  // }

  @Post()
  async create(@Body() input: CategoryDto, @User() user): Promise<CategoryEntity> {
    return this._categoryService.create(input, user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() input: CategoryDto,
    @User() user: any
  ): Promise<CategoryEntity> {
    return this._categoryService.update(id, input, user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @User() user: any
  ): Promise<DeleteResponse> {
    return this._categoryService.delete(id, user.id);
  }
}

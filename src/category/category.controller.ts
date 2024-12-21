import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryResponse } from './interface/pagination-category.interface';
import { Category } from 'entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get('all')
    async findAll(@Headers() headers: Record<string, string>, @Headers('host') host: string) {
        console.log(headers, "<<Headers");
        console.log(host, '<<Host');
        
        return this.categoryService.findAll();
    }

    @Get()
    async findPage(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<PaginationCategoryResponse<Category>> {
        return this.categoryService.findPage(page, limit);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{message: string}> {
        await this.categoryService.remove(id);

        return {
            message: `Category with ID ${id} has been removed successfully.`
        }
    }

}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryResponse } from './interface/pagination-category.interface';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(newCategory);
    }

    async findPage(page: number = 1, limit: number = 10): Promise<PaginationCategoryResponse<Category>> {
        if(page <= 0 || limit <= 0) {
            throw new HttpException({
                message: 'Page and limit must be greater than 0',
                error: 'BadRequest',
            }, HttpStatus.BAD_REQUEST)
        };

        const [data, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit
        });

        const totalPage = Math.ceil(total/limit);

        return {
            data,
            total,
            page,
            limit,
            totalPage,
            firstPage: 1,
            lastPage: totalPage,
            nextPage: page < totalPage ? +page + 1 : null,
            prevPage: page > 1 ? +page - 1 : null
        }
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {
                id
            }
        });

        if(!category) {
            throw new HttpException({
                message: 'Category not found',
                error: 'NotFound'
            }, HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoryRepository.preload({
            id,
            ...updateCategoryDto
        });

        if(!category) {
            throw new HttpException({
                message: 'Category not found',
                error: 'NotFound'
            }, HttpStatus.NOT_FOUND);
        };

        return this.categoryRepository.save(category);
    }

    async remove(id: number): Promise<void> {
        const category = await this.findOne(id);

        if(!category) {
            throw new HttpException({
                message: 'Category not found',
                error: 'NotFound'
            }, HttpStatus.NOT_FOUND);
        };
        
        await this.categoryRepository.remove(category);
        
    }
}

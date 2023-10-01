import {Controller, Get} from '@nestjs/common';
import {Category} from "./category.entity";
import { CategoryService } from './category.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Implement your category-related endpoints here
}
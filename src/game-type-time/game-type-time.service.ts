
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {GameTypeTime} from "./game_type_time.entity";


@Injectable()
export class GameTypeTimeService {
    constructor(
        @InjectRepository(GameTypeTime)
        private categoryRepository: Repository<GameTypeTime>,
    ) {}

    async findAll(): Promise<GameTypeTime[]> {
        return this.categoryRepository.find();
    }

    // Implement your category-related business logic here
}
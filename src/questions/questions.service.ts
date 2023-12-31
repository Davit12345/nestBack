import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
    ) {}


    async findAll(limit:number) {
        return await this.questionsRepository.find({
            take: limit
        });
    }
    async findAllRandom(limit:number,categoryId:number): Promise<Question[]> {
        return this.questionsRepository.createQueryBuilder()
            .where('category_id = :categoryId', {categoryId:categoryId})
            .orderBy('RAND()')
            .take(limit)
            .getMany();
    }
    // Implement your question-related business logic here
}
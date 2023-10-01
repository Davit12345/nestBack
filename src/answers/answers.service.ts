import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private answersRepository: Repository<Answer>,
    ) {}


    async findByQuestionId(questionId: number) {
        return await this.answersRepository.find({
            where: { question_id: questionId },
        });
    }
    async findByQuestionIdRandom(questionId: number): Promise<Answer[]> {
        return this.answersRepository.createQueryBuilder('answer')
            .where('question_id = :questionId', { questionId })
            .orderBy("RAND()")
            .getMany();
    }
}
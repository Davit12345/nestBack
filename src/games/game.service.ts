import { Injectable } from '@nestjs/common';
import {QuestionsService} from "../questions/questions.service";
import {AnswersService} from "../answers/answers.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../article/comment.entity";

@Injectable()
export class GameService {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly answersService: AnswersService,
    ) {}

    async getGame() {
        const questions = await this.questionsService.findAllRandom(10,6); // Assuming you have a findAll method in QuestionsService
        const formattedQuestions = await Promise.all(
            questions.map(async (question) => {
                const answers = await this.answersService.findByQuestionIdRandom(
                    question.id,
                ); // Assuming you have a findByQuestionId method in AnswersService
                return {
                    id: question.id,
                    question: question.question,
                    answers: answers.map((answer) => ({
                        text: answer.text,
                        flag: answer.flag,
                    })),
                };
            }),
        );

        return { questions: formattedQuestions };
    }
}
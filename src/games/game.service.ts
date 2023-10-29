import {Injectable} from '@nestjs/common';
import {QuestionsService} from "../questions/questions.service";
import {AnswersService} from "../answers/answers.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../article/comment.entity";
import {FollowsEntity} from "../profile/follows.entity";
import {Repository} from "typeorm";
import {SimpleGameEntity} from "./simple-game.entity";
import {SimpleGameResultDto} from "./simple-game-result.dto";
import {UserEntity} from "../user/user.entity";
import {UserDto} from "../user/dto/user-info.dto";

@Injectable()
export class GameService {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly answersService: AnswersService,
        @InjectRepository(SimpleGameEntity)
        private readonly simpleGameRepository: Repository<SimpleGameEntity>
    ) {
    }

    async getGame(_categories: Array<number>) {
        const questions = await this.questionsService.findAllRandom(10, _categories); // Assuming you have a findAll method in QuestionsService
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

        return {questions: formattedQuestions};
    }

    async saveResult(user_id: number, _result: SimpleGameResultDto) {
        var result = new SimpleGameEntity();
        result.correct = _result.correct;
        result.incorrect = _result.incorrect;
        result.count = _result.count;
        result.time_type_id = _result.time_type_id;
        result.points = _result.points;
        result.category_id = _result.category_id;
        result.user_id = user_id;
        return await this.simpleGameRepository.save(result);


    }

    async getTopData(_result: SimpleGameResultDto) {
        const a =await  this.simpleGameRepository.find({
            where: {
                category_id: _result.category_id,
                time_type_id: _result.time_type_id,
            },
            order:{
                points: 'DESC'
            },
            take: 5,
            relations: ['user']
        });
      a.forEach(result => {
            result.user = this.transformUser(result.user);
        });
      return a;

    }

    transformUser(user: UserDto): UserDto {
        return {
            username: user.username,
            email: user.email,
        };
    }
}
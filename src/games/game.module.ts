
import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { QuestionsModule } from '../questions/questions.module';
import {AnswersModule} from "../answers/answers.module";
import {AnswersService} from "../answers/answers.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Answer} from "../answers/answer.entity";
import {Question} from "../questions/question.entity";
import {QuestionsService} from "../questions/questions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Answer,Question]), AnswersModule,QuestionsModule],
  controllers: [GameController],
  providers: [GameService,AnswersService,QuestionsService],
})
export class GameModule {}
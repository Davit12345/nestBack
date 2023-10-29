
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
import {GameTypeTime} from "../game-type-time/game_type_time.entity";
import {SimpleGameEntity} from "./simple-game.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SimpleGameEntity,Answer,Question]), AnswersModule,QuestionsModule,],
  controllers: [GameController],
  providers: [GameService,AnswersService,QuestionsService],
})
export class GameModule {}
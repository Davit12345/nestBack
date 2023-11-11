import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ArticleModule} from './article/article.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ProfileModule} from './profile/profile.module';
import {TagModule} from './tag/tag.module';
import {CategoryModule} from './category/category.module';
import {QuestionsModule} from './questions/questions.module';
import {AnswersModule} from './answers/answers.module';
import {GameModule} from './games/game.module';
import {GameTypeTimeModule} from "./game-type-time/game-type-time.module";
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticleModule,
    UserModule,
    ProfileModule,
    CategoryModule,
    QuestionsModule,
    AnswersModule,
    GameTypeTimeModule,
    TagModule,
    GameModule,
  ],
  controllers: [
    AppController
  ],
  providers: [SocketGateway]
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}

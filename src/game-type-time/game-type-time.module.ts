import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GameTypeTime} from "./game_type_time.entity";
import {GameTypeTimeController} from "./game_type_time.controller";
import {GameTypeTimeService} from "./game-type-time.service";

@Module({
    imports: [TypeOrmModule.forFeature([GameTypeTime])],
    controllers: [GameTypeTimeController],
    providers: [GameTypeTimeService],
})
export class GameTypeTimeModule {}
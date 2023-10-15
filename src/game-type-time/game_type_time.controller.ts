import {Controller, Get} from '@nestjs/common';

import {ApiTags} from "@nestjs/swagger";
import {GameTypeTimeService} from './game-type-time.service';
import {GameTypeTime} from "./game_type_time.entity";

@Controller('game-type-time')
export class GameTypeTimeController {
    constructor(private readonly categoryService: GameTypeTimeService) {
    }

    @Get()
    async findAll(): Promise<GameTypeTime[]> {
        return this.categoryService.findAll();
    }

}
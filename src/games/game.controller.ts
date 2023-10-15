import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {GameService} from './game.service';
import {User} from "../user/user.decorator";
import {SimpleGameResultDto} from "./simple-game-result.dto";

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {
    }

    @Get('simple/:categories')
    getGame(@Param('categories') categories: string) {
        const _categories = JSON.parse(categories);
        return this.gameService.getGame(_categories);
    }

    @Post('simple/result')
    async  keepResult(@User('id') userId: number,@Body('result') result: SimpleGameResultDto) {
      var resultData=  await this.gameService.saveResult(userId,result);
      var topData=  await this.gameService.getTopData(result);
      return resultData;
    }


}
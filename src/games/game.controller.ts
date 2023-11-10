import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {GameService} from './game.service';
import {User} from "../user/user.decorator";
import {SimpleGameResultDto} from "./simple-game-result.dto";

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {
    }

    @Get('simple/:id')
    getGame(@Param('id') category: number) {
        return this.gameService.getGame(category);
    }

    @Post('simple/result')
    async  keepResult(@User('id') userId: number,@Body('result') result: SimpleGameResultDto) {
      var resultData=  await this.gameService.saveResult(userId,result);
      var topData=  await this.gameService.getTopData(result);
      return    {result:resultData,topList:topData};
    }


}
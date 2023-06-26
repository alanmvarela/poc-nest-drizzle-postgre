import { Controller, Post, Get, Delete, Body, Param} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardType } from './cards.enum';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardParamDto } from './dtos/card-param.dto';
import { CardParamTypeDto } from './dtos/card-param-type.dto';


@Controller('trello-manager')
export class CardsController {

    constructor(private cardsService: CardsService) { }
    
    @Post("")
    async createCard(@Body() body: CreateCardDto) {
        return this.cardsService.createCard(body);
    }

    @Get("/:type")
    async getCards(@Param() typeParam: CardParamTypeDto) {
        return this.cardsService.getCards(typeParam.type as CardType);
    }

    @Get("/:type/:id")
    async getCard(@Param() param: CardParamDto) {
        console.log(param);
        return this.cardsService.getCard(param.type, param.id);
    }

    @Delete("/:type/:id")
    async deleteCard(@Param() param: CardParamDto) {
        return this.cardsService.deleteCard(param.type as CardType, param.id);
    }

}

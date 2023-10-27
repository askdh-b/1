import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { CardDto } from './card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class CardController {

    constructor(@Inject(forwardRef(() => CardService)) private readonly cardService: CardService) {}

    @Get("users/:userId/columns/:columnId/cards/:cardId")
    async getCard(@Param("cardId") cardId: number): Promise<Card> {
        const card = await this.cardService.getCard(cardId);

        if (!card) {
            throw new NotFoundException('This card doesn\'t exist');
        }

        return card;
    }

    @Get("users/:userId/columns/:columnId/cards")
    async getCards(@Param("columnId") columnId: number): Promise<Card[]> {
        return await this.cardService.getAllCards(columnId);
    }

    @Post("users/:userId/columns/:columnId/cards")
    async addCard(@Param("columnId") columnId: number, @Body() card: CardDto): Promise<Card> {
        return await this.cardService.createCard(columnId, card);
    }

    @UseGuards(JwtAuthGuard)
    @Put("users/:userId/columns/:columnId/cards/:cardId")
    async updateCard(@Param("columnId") columnId: number, @Param("cardId") cardId: number, @Body() card: CardDto): Promise<Card> {
        return await this.cardService.updateCard(cardId, columnId, card);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("users/:userId/columns/:columnId/cards/:cardId")
    async deleteCard(@Param("cardId") cardId: number) {
        const deleted = await this.cardService.deleteCard(cardId);
        return "Successfully deleted";
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { ColumnService } from 'src/column/column.service';
import { JwtService } from '@nestjs/jwt';
import { CardDto } from './card.dto';

@Injectable()
export class CardService {

    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
        private columnService: ColumnService,
        private jwtService: JwtService
    ) {}

    async getCard(id: number): Promise<Card> {
        return await this.cardRepository.findOne( { where: { id: id } } );
    }

    async getAllCards(columnId: number): Promise<Card[]> {
        return await this.cardRepository.find( { where: { column: await this.columnService.getColumn(columnId) } } );
    }

    async createCard(columnId: number, cardDto: CardDto): Promise<Card> {
        return await this.cardRepository.save( {
            title: cardDto.title,
            description: cardDto.description,
            deadline: cardDto.deadline,
            status: cardDto.status,
            column: await this.columnService.getColumn(columnId)
        } );
    }

    async updateCard(id: number, columnId: number, cardDto: CardDto): Promise<Card> {
        await this.cardRepository.update(id, {
            title: cardDto.title,
            description: cardDto.description,
            deadline: cardDto.deadline,
            status: cardDto.status,
            column: await this.columnService.getColumn(columnId)
        } );
        return await this.cardRepository.findOne( { where: { id: id } } );
    }

    async deleteCard(id: number) {
        return await this.cardRepository.delete(id);
    }

}

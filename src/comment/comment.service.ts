import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CardService } from 'src/card/card.service';
import { CommentDto } from './comment.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private cardService: CardService,
        private userService: UserService
    ) {}

    async getComment(id: number): Promise<Comment> {
        return await this.commentRepository.findOne( { where: { id: id } } );
    }

    async getAllComments(cardId: number): Promise<Comment[]> {
        return await this.commentRepository.find( { where: { card: await this.cardService.getCard(cardId) } } );
    }

    async createComment(cardId: number, userId: number, commentDto: CommentDto): Promise<Comment> {
        return await this.commentRepository.save({
            content: commentDto.content,
            user: await this.userService.getUser(userId),
            card: await this.cardService.getCard(cardId)
        });
    }

    async updateComment(id: number, cardId: number, commentDto: CommentDto): Promise<Comment> {
        await this.commentRepository.update(id, {
            content: commentDto.content,
            user: await this.userService.getUser(1),
            card: await this.cardService.getCard(cardId)
        });
        return await this.commentRepository.findOne( { where: { id: id } } );
    }

    async deleteComment(id: number) {
        return await this.commentRepository.delete(id);
    }

}
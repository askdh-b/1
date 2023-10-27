import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Request, UseGuards, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentDto } from './comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class CommentController {

    constructor(@Inject(forwardRef(() => CommentService)) private readonly commentService: CommentService) {}

    @Get("users/:userId/columns/:columnId/cards/:cardId/comments/:commentId")
    async getComment(@Param("commentId") commentId: number): Promise<Comment> {
        const comment = await this.commentService.getComment(commentId);

        if (!comment) {
            throw new NotFoundException('This comment doesn\'t exist');
        }

        return comment;
    }

    @Get("users/:userId/columns/:columnId/cards/:cardId/comments")
    async getComments(@Param("cardId") cardId: number): Promise<Comment[]> {
        return await this.commentService.getAllComments(cardId);
    }

    @Post("users/:userId/columns/:columnId/cards/:cardId/comments")
    async addComment(@Request() req: any, @Param("cardId") cardId: number, @Body() comment: CommentDto): Promise<Comment> {
        return await this.commentService.createComment(cardId, req.id, comment);
    }

    @UseGuards(JwtAuthGuard)
    @Put("users/:userId/columns/:columnId/cards/:cardId/comments/:commentId")
    async updateComment(@Param("cardId") cardId: number, @Param("commentId") commentId: number, @Body() comment: CommentDto): Promise<Comment> {
        return await this.commentService.updateComment(commentId, cardId, comment);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("users/:userId/columns/:columnId/cards/:cardId/comments/:commentId")
    async deleteComment(@Param("commentId") commentId: number) {
        const deleted = await this.commentService.deleteComment(commentId);
        return "Successfully deleted";
    }

}

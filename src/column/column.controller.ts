import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Request, UseGuards, forwardRef } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Column } from './column.entity';
import { ColumnDto } from './column.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class ColumnController {

    constructor(@Inject(forwardRef(() => ColumnService)) private readonly columnService: ColumnService) {}

    @Get("users/:userId/columns/:columnId")
    async getColumn(@Param("columnId") columnId: number): Promise<Column> {
        const column = await this.columnService.getColumn(columnId);

        if (!column) {
            throw new NotFoundException('This column doesn\'t exist');
        }

        return column;
    }

    @Get("users/:userId/columns")
    async getColumns(@Param("userId") userId: number): Promise<Column[]> {
        return await this.columnService.getAllColumns(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("columns")
    async addColumn(@Request() req: any, @Body() column: ColumnDto): Promise<Column> {
        return await this.columnService.createColumn(req.userId, column);
    }

    @UseGuards(JwtAuthGuard)
    @Put("users/:userId/columns/:columnId")
    async updateColumn(@Param("userId") userId: number, @Param("columnId") columnId: number, @Body() column: ColumnDto): Promise<Column> {
        return await this.columnService.updateColumn(columnId, userId, column);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("users/:userId/columns/:columnId")
    async delColumn(@Param("columnId") columnId: number) {
        const deleted = this.columnService.delColumn(columnId);
        return "Successfully deleted"; 
    }

}
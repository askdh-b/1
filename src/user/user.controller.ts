import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {

    constructor(@Inject(forwardRef(() => UserService)) private readonly userService: UserService) {}

    @Get(":id")
    async getUser(@Param('id') id: number): Promise<User> {
        const user = await this.userService.getUser(id);

        if (!user) {
            throw new NotFoundException('This user doesn\'t exist');
        }

        return user;
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        const users = await this.userService.getAllUsers();
        return users;
    }

    @Post()
    async addUser(@Body() user: UserDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateUser(@Param('id') id: number, @Body() user: UserDto): Promise<User> {
        return await this.userService.updateUser(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        const deleted = await this.userService.deleteUser(id);
        return "Successfully deleted";
    }

}
import { Controller, Get, Param, Post, Patch, Delete, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from 'src/DTOs/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
      
    @Get()
    async getUsers(@Query('page') page, @Query('limit') limit) {
        if (page && !Number.isInteger(page) || Number.parseInt(page) < 0) {
            page = 0;
        }
        if (limit && !Number.isInteger(limit) || Number.parseInt(limit) <= 0) {
            limit = 15;
        }

        return await this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    async getUser(@Param() params) {
        return await this.usersService.getUser(params.id);
    }

    @Post()
    async createUser(@Body() user: UserDTO) {
        await this.usersService.createUser(user);
    }

    @Patch(':id')
    async updateUser(@Param() params, @Body() updates: Partial<UserDTO>) {
        await this.usersService.updateUser(params.id, updates);
    }

    @Delete(':id')
    async deleteUser(@Param() params) {
        await this.usersService.deleteUser(params.id);
    }
}

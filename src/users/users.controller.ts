import { Controller, Get, Param, Post, Patch, Delete, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from 'src/DTOs/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
      
    @Get()
    async getUsers(@Query('page') page: any = '10', @Query('limit') limit: any = '15') {
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);

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

    // TODO: Authenticate
    @Patch(':id')
    async updateUser(@Param() params, @Body() updates: Partial<UserDTO>) {
        await this.usersService.updateUser(params.id, updates);
    }

    // TODO: Authenticate
    @Delete(':id')
    async deleteUser(@Param() params) {
        await this.usersService.deleteUser(params.id);
    }
}

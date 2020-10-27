import { Controller, Get, Param, Patch, Delete, Query, Body, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDTO } from 'src/DTOs/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizerService } from './authorizer/authorizer.service';

@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService, private readonly authorizerService: AuthorizerService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() response: Response) {
        const token = await this.usersService.googleLogin(req.user);
        response.cookie('hackhub', token);
        response.status(200);
        response.redirect(process.env.CLIENT_BASE_URL || 'http://localhost:4200');
    }
      
    @Get('users')
    async getUsers(@Query('page') page: any = '10', @Query('limit') limit: any = '15') {
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);

        return await this.usersService.getUsers(page, limit);
    }

    @Get('users/:id')
    async getUser(@Param() params) {
        return await this.usersService.getUser(params.id);
    }

    @Patch('users/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Req() req, @Param() params, @Body() updates: Partial<UserDTO>) {
        this.authorizerService.validateIsUser(params.id, req.user);
        await this.usersService.updateUser(params.id, updates);
    }

    @Delete('users/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Req() req, @Param() params) {
        this.authorizerService.validateIsUser(params.id, req.user);
        await this.usersService.deleteUser(params.id);
    }
}

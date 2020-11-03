import { Controller, Get, Post, Patch, Delete, Query, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDTO } from 'src/DTOs/project.dto';
import { AuthorizerService } from './authorizer/authorizer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService, private readonly authorizerService: AuthorizerService) {}

    @Get('projects')
    async getProjects(@Query('page') page: any = '0', @Query('limit') limit: any = '15') {
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);

        return await this.projectsService.getProjects(page, limit);
    }

    @Get('users/:userId/projects')
    async getUserProjects(@Param() params) {
        return await this.projectsService.getUserProjects(params.userId);
    }

    // TODO: Authenticate if visible
    @Get('projects/:id')
    async getProject(@Req() req, @Param() params) {
        return await this.projectsService.getProject(params.id);
    }

    // TODO: Authenticate
    @Post('projects')
    @UseGuards(AuthGuard('jwt'))
    async createProject(@Req() req, @Body() project: ProjectDTO) {
        await this.projectsService.createProject(project);
    }

    @Patch('projects/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateProject(@Req() req, @Param() params, @Body() updates: Partial<ProjectDTO>) {
        await this.authorizerService.validateIsProjectOwner(params.id, req.user);
        await this.projectsService.updateProject(params.id, updates);
    }

    @Delete('projects/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteProject(@Req() req, @Param() params) {
        await this.authorizerService.validateIsProjectOwner(params.id, req.user);
        await this.projectsService.deleteProject(params.id);
    }
}

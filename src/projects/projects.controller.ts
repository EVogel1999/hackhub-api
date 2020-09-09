import { Controller, Get, Post, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDTO } from 'src/DTOs/project.dto';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async getProjects(@Query('page') page: any = '10', @Query('limit') limit: any = '15') {
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);

        return await this.projectsService.getProjects(page, limit);
    }

    // TODO: Authenticate if visible
    @Get(':id')
    async getProject(@Param() params) {
        return await this.projectsService.getProject(params.id);
    }

    // TODO: Authenticate
    @Post()
    async createProject(@Body() project: ProjectDTO) {
        await this.projectsService.createProject(project);
    }

    // TODO: Authenticate
    @Patch(':id')
    async updateProject(@Param() params, @Body() updates: Partial<ProjectDTO>) {
        await this.projectsService.updateProject(params.id, updates);
    }

    // TODO: Authenticate
    @Delete(':id')
    async deleteProject(@Param() params) {
        await this.projectsService.deleteProject(params.id);
    }
}

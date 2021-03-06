import { Injectable } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProjectDTO } from 'src/DTOs/project.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projects: MongoRepository<Project>,
        // private readonly elasticsearch: ElasticsearchService
    ) {}

    async getProjects(page: number, limit: number): Promise<Project[]> {
        return await this.projects.aggregate([
            { $match: {} },
            { $skip: page * limit },
            { $limit: limit }
        ]).toArray();
    }

    async getUserProjects(id: string): Promise<Project[]> {
        return await this.projects.aggregate([
            { $match: {authorID: id} }
        ]).toArray();
    }

    async getProject(id: string): Promise<Project> {
        return await this.projects.findOne(id);
    }

    async createProject(project: ProjectDTO): Promise<void> {
        const created = await this.projects.save(project);
    }

    async updateProject(id: string, updates: Partial<ProjectDTO>): Promise<void> {
        await this.projects.update(id, updates);
    }

    async deleteProject(id: string): Promise<void> {
        await this.projects.delete(id);
    }
}

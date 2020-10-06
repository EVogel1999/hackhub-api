import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects.service';

@Injectable()
export class AuthorizerService {

    constructor(private readonly projectService: ProjectsService) { }

    async validateIsProjectOwner(projectId, user) {
        const project = await this.projectService.getProject(projectId);
        if (project.authorID !== user.id) {
            throw new Error(`Project ${projectId} does not belong to the requester`);
        }
    }
}

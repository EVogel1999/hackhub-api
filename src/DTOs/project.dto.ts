export class ProjectDTO {
    readonly id?: string;
    readonly authorID: string;
    readonly name: string;
    readonly description: string;
    readonly repositoryURL?: string;
    readonly tags?: string[];
}
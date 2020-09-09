import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('projects')
export class Project {
  @ObjectIdColumn() id: ObjectID;
  @Column() authorID: string;
  @Column() name: string;
  @Column() description: string;
  @Column() repositoryURL?: string;
  @Column() tags?: string[];

  constructor(user?: Partial<Project>) {
    Object.assign(this, user);
  }
}
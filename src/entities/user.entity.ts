import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() email: string;
  @Column() profileURL: string;
  @Column() name: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
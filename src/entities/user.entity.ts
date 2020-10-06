import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() _id: ObjectID;
  @PrimaryColumn() id: string;
  @Column() email: string;
  @Column() profileURL: string;
  @Column() name: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
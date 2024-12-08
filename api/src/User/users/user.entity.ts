import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avtorizations')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  roleId: number; 
}

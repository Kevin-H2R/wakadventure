import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: number;

  @Column()
  json: string;

  @ManyToOne(() => User, user => user.stats)
  user: User;
}

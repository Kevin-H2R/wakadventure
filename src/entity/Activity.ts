import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User"

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    language: string;

    @Column({type: "float"})
    total_seconds: number;

    @Column()
    date: Date

    @ManyToOne(type => User, user => user.activities)
    user: User
}

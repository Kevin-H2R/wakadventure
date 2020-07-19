import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User"
import {Stats} from "./Stats"

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    creation_date: Date;

    @ManyToOne(type => User, user => user.characters)
    user: User

    @OneToMany(type => Stats, stats => stats.character)
    stats: Stats[]
}

import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Character} from "./Character"
import { Activity } from "./Activity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string

    @Column()
    hash: string;

    @OneToMany(type => Character, character => character.user)
    characters: Character[]

    @OneToMany(type => Activity, activity => activity.user)
    activities: Activity[]
}

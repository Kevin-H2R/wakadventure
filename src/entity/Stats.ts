import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Character} from "./Character"

@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToOne(type => Character, character => character.stats)
    character: Character
}

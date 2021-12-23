import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Stats} from "../stats/stats.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    @Column()
    access_token: string;

    @Column()
    expires_at: string;

    @Column()
    refresh_token: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({nullable: true})
    username: string;

    @OneToMany(type => Stats, stats => stats.user)
    stats: Stats[]
}

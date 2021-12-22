import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

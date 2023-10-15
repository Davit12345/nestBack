import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
export enum GameType {
    TIME = 1,
    COUNT = 2,
}

@Entity({ name: 'game_type_time' }) // Specify the table name here
export class GameTypeTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: GameType.TIME }) // Default value is 0
    type: number;

    @Column()
    count: number;

}
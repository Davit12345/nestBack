import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'simple-game' }) // Specify the table name here
export class SimpleGameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_type_id: number;

    @Column()
    correct: number;

    @Column()
    incorrect: number;

    @Column()
    count: number;

    @Column()
    points: number;

    @Column()
    user_id: number;
}
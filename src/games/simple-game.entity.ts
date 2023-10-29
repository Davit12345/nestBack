import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {UserEntity} from "../user/user.entity";
import { Transform } from 'class-transformer';
import {UserDto} from "../user/dto/user-info.dto";

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


    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    @Transform(user => ({
        username: user.username,
        email: user.email,
    }))
    user: UserDto;

    @Column()
    category_id: number;

}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../questions/question.entity';

@Entity({ name: 'answers' })
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    question_id: number;

    @Column()
    flag: boolean;

    @ManyToOne(() => Question, question => question.id)
    @JoinColumn({ name: 'question_id' })
    question: Question;
}
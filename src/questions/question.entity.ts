import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Category} from "../category/category.entity";

@Entity({ name: 'questions' }) // Specify the table name here
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    category_id: number;

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}
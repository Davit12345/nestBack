import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'categories' }) // Specify the table name here
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0 }) // Default value is 0
    parent_id: number;

    @Column()
    flag: string;

    @Column({ default: false }) // Default value for hasImage
    hasImage: boolean;
}
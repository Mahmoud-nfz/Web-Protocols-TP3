import { Model } from '../common/Model';
import { Cv } from '../cvs/entities/cv.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserModel extends Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['email'])
    @Column()
    email: string;

    @Unique(["username"])
    @Column({ nullable: true })
    username: string;

    @OneToMany(
        () => Cv,
        (cv: Cv) => cv.user,
    )
    cvs: Cv[];

    @Column()
    password: string;
}

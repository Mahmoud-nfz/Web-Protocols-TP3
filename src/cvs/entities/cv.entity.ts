import { type } from 'os';
import { Model } from '../../common/Model';
import { Skill } from '../../skills/entities/skill.entity';
import { UserModel } from '../../users/user.model';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity("cv")
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstName: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;

    @ManyToOne(
        () => UserModel,
        (user : UserModel) => user.cvs,
        {eager: true}
    )
    user: UserModel;

    @ManyToMany(
        type => Skill,
        skill => skill.cvs,
        {eager: true}
    )
    skills: Skill[];
}

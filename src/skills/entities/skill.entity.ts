import { type } from 'os';
import { Cv } from '../../cvs/entities/cv.entity';
import { UserModel } from '../../users/user.model';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity("skill")
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation: string;

    @ManyToMany(
        type => Cv,
        cv => cv.skills
    )
    @JoinTable({
        name: "cv_skill",
        joinColumn:{
            name: "skill_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "cv_id",
            referencedColumnName: "id"
        }
    })
    cvs: Cv[];
}

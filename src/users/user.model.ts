import { Model } from 'src/common/Model';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserModel extends Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['email'])
    @Column()
    email: string;

    @Column()
    password: string;
}

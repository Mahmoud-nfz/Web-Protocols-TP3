import { Model } from '../common/Model';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Statuts } from "./enums/statuts.enum";
@Entity('todo')
export class TodoModel extends Model {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string ;
    @Column()
    description : string ;

    @Column({enum: Statuts})
    statut : Statuts ;
}

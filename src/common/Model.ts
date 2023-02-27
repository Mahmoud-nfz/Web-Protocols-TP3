import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity('Todo')
export class Model{
    
    @CreateDateColumn({ update: false })
    dateCreation ?: Date ;
    
    @UpdateDateColumn()
    dateModification ?: Date ;

    @DeleteDateColumn()
    dateSuppression ?: Date ;
}
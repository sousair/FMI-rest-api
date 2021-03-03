import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Medic {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 120
    })
    name: string;

    @Column({
        unique: true,        
    })
    crm: string;

    @Column()
    tel: string;

    @Column()
    cel: string;

    @Column()
    cep: string;

    @Column()
    logradouro: string;

    @Column()
    bairro: string;
    
    @Column()
    localidade: string;

    @Column()
    uf: string;

    @Column({
        array: true
    })
    specialties: string;

    @Column({
        default: false
    })
    isDeleted: boolean;

}
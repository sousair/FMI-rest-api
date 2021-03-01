import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
    tel: number;

    @Column()
    cel: number;

    // retirar cep e utilizar informações da API
    @Column()
    cep: string;

    @Column({
        array: true
    })
    specialities: string;

}
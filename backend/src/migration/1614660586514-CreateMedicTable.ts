import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicTable1614660586514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'medic',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar(120)',
                },
                {
                    name: 'crm',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'tel',
                    type: 'varchar'
                },
                {
                    name: 'cel',
                    type: 'varchar',
                },
                {
                    name: 'cep',
                    type: 'varchar',
                },
                {
                    name: 'logradouro',
                    type: 'varchar'
                },
                {
                    name: 'bairro',
                    type: 'varchar'
                },
                {
                    name: 'localidade',
                    type: 'varchar'
                },
                {
                    name: 'uf',
                    type: 'varchar',
                },
                {
                    name: 'specialties',
                    type: 'varchar[]'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medic')
    }

}

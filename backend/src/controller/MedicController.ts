import { Validations } from './../configs/validations';
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Medic } from './../entity/Medic';
import { xml2json } from 'xml-js';
import axios from 'axios';

export class MedicController {

    private medicRepository = getRepository(Medic);

    private validations = new Validations;

    private formatCEP(cep: string): string {
        const subCep1 = cep.slice(0, 5);
        const subCep2 = cep.slice(5, 9);

        return `${subCep1}-${subCep2}`;
    }

    private formatCRM(crm: string): string {
        const subCrm1 = crm.slice(0, 2);
        const subCrm2 = crm.slice(2, 5);
        const subCrm3 = crm.slice(5, 8);

        return `${subCrm1}.${subCrm2}.${subCrm3}`;
    }

    async getAllMedics(request: Request, response: Response, next: NextFunction) {
        this.medicRepository
            .find({ isDeleted: false })
            .then(medics => response.status(200).json(medics))
            .catch(error => response.status(400).send(error));
    }

    async getMedicsWithSpecificSpecialty(request: Request, response: Response, next: NextFunction) {
        const value: string = request.params.value.toUpperCase();

        this.medicRepository.createQueryBuilder('medic')
            .andWhere(':specialtie = any(specialties)', { specialtie: value })
            .getMany()
            .then(medics => medics.filter(medic => !medic.isDeleted))
            .then(activeMedics => response.status(200).json(activeMedics))
            .catch(error => response.status(400).send(error));
    }

    async getOneMedic(request: Request, response: Response, next: NextFunction) {
        const type: string = request.params.type;
        let value: string = request.params.value;

        if(type === 'crm' || 'cep') {
            switch(type) {
                case 'crm': {
                    value = this.formatCRM(value)
                    break;
                }
                case 'cep': {
                    value = this.formatCEP(value);
                    break;
                }
            }
        }

        this.medicRepository.findOne({ [type]: value, isDeleted: false })
            .then(medicOne => response.status(200).json(medicOne))
            .catch(error => response.status(400).send(error));
    }

    async saveMedic(request: Request, response: Response, next: NextFunction) {
        const medic = { ...request.body };

        try {
            if(!medic.crm) throw 'Informe o CRM do médico';
            if(!this.validations.verifyCRM(medic.crm)) throw 'CRM Inválido';

            if(!medic.cep) throw 'Informe o CEP do médico';
            if(!this.validations.verifyCEP(medic.cep)) throw 'CEP Inválido';

            if(!medic.tel) throw 'Informe o Telefone Fixo do médico';
            if(!this.validations.verifyTel(medic.tel)) throw 'Telefone Fixo Inválido';

            if(!medic.cel) throw 'Informe o Número do médico';
            if(!this.validations.verifyCel(medic.cel)) throw 'Número Inválido';

            if(!medic.name) throw 'Infome o nome do médico';

            if(!medic.specialties) throw 'Informe ao menos duas especialidades do médico';
            if(medic.specialties.length < 2) throw 'Numero de especialidades insuficiente';

            // requisição para api de cep
            await axios.get(`https://viacep.com.br/ws/${medic.cep}/xml`)
                .then(axiosRes => axiosRes.data)
                .then(data => xml2json(data, { compact: true }))
                .then(jsonData => JSON.parse(jsonData))
                .then(xmlJsonfyed => {
                    const xmlData = xmlJsonfyed.xmlcep;

                    medic.logradouro = xmlData.logradouro._text;
                    medic.bairro = xmlData.bairro._text;
                    medic.localidade = xmlData.localidade._text;
                    medic.uf = xmlData.uf._text;
                })
                .catch(error => response.status(500).send(error));

            medic.cep = this.formatCEP(medic.cep);
            medic.crm = this.formatCRM(medic.crm);

            this.medicRepository.save(medic)
                .then(_ => response.status(204).send(_))
                .catch(error => response.status(400).send(error));

        } catch (msg) {
            response.status(400).send(msg);
        }
    }

    async updateMedic(request: Request, response: Response, next: NextFunction) {

        const medic = { ...request.body }

        try{
            if(medic.crm && !this.validations.verifyCRM(medic.crm)) throw 'CRM inválido';
            if(medic.cep && !this.validations.verifyCEP(medic.cep)) throw 'CEP inválido';
            if(medic.tel && !this.validations.verifyTel(medic.tel)) throw 'Telefone fixo inválido';
            if(medic.cel && !this.validations.verifyCel(medic.cel)) throw 'Número inválido';

            const medicFromDataBase = await this.medicRepository
                .findOne({ id: request.params.id });
        
            if(!medicFromDataBase) response.status(400).send('Médico não encontrado');

            medic.crm = this.formatCRM(medic.crm);
            medic.cep = this.formatCEP(medic.cep);

            this.medicRepository
                .save(medic)
                .then(_ => response.status(200).send(_))
                .catch(error => response.status(500).send(error));

        }catch (msg) {
            response.status(400).send(msg);
        }
    }

    async removeMedic(request: Request, response: Response, next: NextFunction) {
        const medicFromDataBase = await this.medicRepository
                .findOne({ id: request.params.id });

        if(!medicFromDataBase) response.status(400).send('Médico não encontrado');

        this.medicRepository
            .save({ ...medicFromDataBase, isDeleted: true })
            .then(_ => response.status(200).send(_))
            .catch(error => response.status(400).send(error));
    }

}
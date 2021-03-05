import { CepApi } from './../configs/cepAPI';
import { Formatters } from './../configs/formatters';
import { Validations } from './../configs/validations';
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Medic } from './../entity/Medic';

export class MedicController {

    private medicRepository = getRepository(Medic);
    private validations = new Validations;
    private formatter = new Formatters;
    private cepApi = new CepApi;

    // Não é usada porém pode vir a calhar em uma conta admin.
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

        if (type === 'crm' || 'cep') {
            switch (type) {
                case 'crm': {
                    value = this.formatter.formatCRM(value)
                    break;
                }
                case 'cep': {
                    value = this.formatter.formatCEP(value);
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
            if (!medic.crm) throw 'Informe o CRM do médico';
            if (!this.validations.verifyCRM(medic.crm)) throw 'CRM Inválido';

            if (!medic.cep) throw 'Informe o CEP do médico';
            if (!this.validations.verifyCEP(medic.cep)) throw 'CEP Inválido';

            if (!medic.tel) throw 'Informe o Telefone Fixo do médico';
            if (!this.validations.verifyTel(medic.tel)) throw 'Telefone Fixo Inválido';

            if (!medic.cel) throw 'Informe o Número do médico';
            if (!this.validations.verifyCel(medic.cel)) throw 'Número Inválido';

            if (!medic.name) throw 'Infome o nome do médico';

            if (!medic.specialties) throw 'Informe ao menos duas especialidades do médico';
            if (medic.specialties.length < 2) throw 'Numero de especialidades insuficiente';

            await this.cepApi.medicWithCepInfo(medic);

            if (medic.error) response.status(400).send(medic.error);

            medic.cep = this.formatter.formatCEP(medic.cep);
            medic.crm = this.formatter.formatCRM(medic.crm);

            this.medicRepository.save(medic)
                .then(_ => response.status(204).send(_))
                .catch(error => response.status(400).send(error, 'aqui'));

        } catch (msg) {
            response.status(400).send(msg);
        }
    }

    async updateMedic(request: Request, response: Response, next: NextFunction) {

        const medic = { ...request.body }

        try {
            if (medic.crm && !this.validations.verifyCRM(medic.crm)) throw 'CRM inválido';
            if (medic.cep && !this.validations.verifyCEP(medic.cep)) throw 'CEP inválido';
            if (medic.tel && !this.validations.verifyTel(medic.tel)) throw 'Telefone fixo inválido';
            if (medic.cel && !this.validations.verifyCel(medic.cel)) throw 'Número inválido';

            const medicFromDataBase = await this.medicRepository
                .findOne({ id: request.params.id });

            if (!medicFromDataBase) response.status(400).send('Médico não encontrado');

            await this.cepApi.medicWithCepInfo(medic);

            if (medic.error) response.status(400).send(medic.error);

            medic.crm = this.formatter.formatCRM(medic.crm);
            medic.cep = this.formatter.formatCEP(medic.cep);

            this.medicRepository
                .save(medic)
                .then(_ => response.status(200).send(_))
                .catch(error => response.status(500).send(error));

        } catch (msg) {
            response.status(400).send(msg);
        }
    }

    async removeMedic(request: Request, response: Response, next: NextFunction) {
        const medicFromDataBase = await this.medicRepository
            .findOne({ id: request.params.id });

        if (!medicFromDataBase) response.status(400).send('Médico não encontrado');

        this.medicRepository
            .save({ ...medicFromDataBase, isDeleted: true })
            .then(_ => response.status(200).send(_))
            .catch(error => response.status(400).send(error));
    }

}
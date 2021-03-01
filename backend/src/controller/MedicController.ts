import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Medic } from './../entity/Medic';

export class MedicController {

    private medicRepository = getRepository(Medic);

    async all(request: Request, response: Response, next: NextFunction) {
        this.medicRepository.find()
            // implementar filter em médicos softdeleted
            .then(medics => response.status(200).json(medics))
            .catch(error => response.status(400));
    }

    async one(request: Request, response: Response, next: NextFunction) {
        // implementar a identificação de qual parametro vai ser requerido e diferenciar o método
        this.medicRepository.findOne(request.params.id)
            .then(medicOne => response.status(200).json(medicOne))
            .catch(error => response.status(400));
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const medic = { ...request.body };
        
        // implemetar validações
        // e fazer a requisição XML para o correio

        await this.medicRepository.save(medic)
            .then(_ => response.status(204))
            .catch(error => console.error(error));
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // Implementar soft delete
    }

}
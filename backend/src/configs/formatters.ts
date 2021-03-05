export class Formatters {

    public formatCEP(cep: string): string {
        const subCep1 = cep.slice(0, 5);
        const subCep2 = cep.slice(5, 9);

        return `${subCep1}-${subCep2}`;
    }

    public formatCRM(crm: string): string {
        const subCrm1 = crm.slice(0, 2);
        const subCrm2 = crm.slice(2, 5);
        const subCrm3 = crm.slice(5, 8);

        return `${subCrm1}.${subCrm2}.${subCrm3}`;
    }
    
}
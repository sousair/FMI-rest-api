export class Validations {

    private lenghtVerify = (array, lenght) => array.length === lenght;

    private numberfyStringArray = stringArray => stringArray.filter(digit => !!parseInt(digit));

    verifyCEP(cep: string): boolean {
        const cepArray = cep.split('')
        if(!this.lenghtVerify(cepArray, 8)) return false;

        const numberCepArray = this.numberfyStringArray(cepArray);
        if(!this.lenghtVerify(numberCepArray, 8)) return false;

        return true;
    }

    verifyCRM(crm: string): boolean {
        const crmArray = crm.split('');
        if(!this.lenghtVerify(crmArray, 7)) return false;

        const numberCrmArray = this.numberfyStringArray(crmArray);
        if(this.lenghtVerify(numberCrmArray, 7)) return false;

        return true;
    }

    verifyTel(tel: string): boolean {
        const telArray = tel.split('');
        if(!this.lenghtVerify(telArray, 8)) return false;

        const numberTelArray = this.numberfyStringArray(telArray);
        if(!this.lenghtVerify(numberTelArray, 8)) return false;

        return true;
    }

    verifyCel(cel: string): boolean{
        const celArray = cel.split('');
        if(!this.lenghtVerify(celArray, 8)) return false;

        const numberCelArray = this.numberfyStringArray(celArray);
        if(!this.lenghtVerify(numberCelArray, 8)) return false;

        return true;
    }
    
}
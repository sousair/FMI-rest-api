export class Validations {

    private lenghtVerify = (array, lenght) => array.length === lenght;

    private numberfyStringArray = stringArray => stringArray.filter(digit => parseInt(digit) <= 9 ? true : false);

    public verifyCEP(cep: string): boolean {
        const cepArray = cep.split('');
        if(!this.lenghtVerify(cepArray, 8)) return false;

        const numberCepArray = this.numberfyStringArray(cepArray);
        if(!this.lenghtVerify(numberCepArray, 8)) return false;

        return true;
    }

    public verifyCRM(crm: string): boolean {
        const crmArray = crm.split('');
        if(!this.lenghtVerify(crmArray, 7)) return false;

        const numberCrmArray = this.numberfyStringArray(crmArray);
        if(!this.lenghtVerify(numberCrmArray, 7)) return false;

        return true;
    }

    public verifyTel(tel: string): boolean {
        const telArray = tel.split('');
        if(!this.lenghtVerify(telArray, 8)) return false;

        const numberTelArray = this.numberfyStringArray(telArray);
        if(!this.lenghtVerify(numberTelArray, 8)) return false;

        return true;
    }

    public verifyCel(cel: string): boolean{
        const celArray = cel.split('');
        if(!this.lenghtVerify(celArray, 12)) return false;

        const numberCelArray = this.numberfyStringArray(celArray);
        if(!this.lenghtVerify(numberCelArray, 12)) return false;

        return true;
    }
    
}
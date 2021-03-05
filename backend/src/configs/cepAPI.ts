import axios from 'axios';
import { xml2json } from 'xml-js';

export class CepApi {
    public async medicWithCepInfo(medic) {

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
            .catch(error => medic.error = error);

        return medic;
    }
}
import React from 'react';
import { Link } from 'react-router-dom';

const MedicOne = (props) => {

    const medic = props.medic;

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th className="border-right">ID</th>
                        <th className="border-right">Nome</th>
                        <th className="border-right">CRM</th>
                        <th className="border-right">CEP</th>
                        <th className="border-right">Cel</th>
                        <th className="border-right">Tel</th>
                        <th className="border-right">Localidade</th>
                        <th className="border-right">Endereço</th>
                        <th className="border-right">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-right">{medic.id}</td>
                        <td className="border-right">{medic.name}</td>
                        <td className="border-right">{medic.crm}</td>
                        <td className="border-right">{medic.cep}</td>
                        <td className="border-right">{medic.cel}</td>
                        <td className="border-right">{medic.tel}</td>
                        <td className="border-right">{medic.localidade}/{medic.uf}</td>
                        <td className="border-right">{medic.logradouro}</td>
                        <td className="border-right">
                            <Link className="tableLink" to={`/editar/${medic.id}`} medic={medic}>Editar</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default MedicOne
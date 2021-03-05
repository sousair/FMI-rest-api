import React from 'react';
import './MedicRoll.css';
import { Link } from 'react-router-dom';

const MedicRoll = (props) => {

    const medic = props.medic;

    return (
        <tr>
            <td className="border-right">{ medic.id }</td>
            <td className="border-right">{ medic.name }</td>
            <td className="border-right">{ medic.crm }</td>
            <td className="border-right">{ medic.cep }</td>
            <td className="border-right">{ medic.cel }</td>
            <td className="border-right">{ medic.tel }</td>
            <td className="border-right">{ medic.localidade }/{ medic.uf }</td>
            <td className="border-right">{ medic.logradouro }</td>
            <td className="border-right">
                <Link className="tableLink" to={`/editar/${ medic.id }`}>Editar</Link>
            </td>
        </tr>
    )
}

export default MedicRoll;
import React from 'react';
import './MedicTable.css';
import MedicRoll from './MedicRoll/MedicRoll';

const MedicTable = (props) => {

    const MedicList = props.medics;
    const MedicRolls = MedicList.map(medic => <MedicRoll key={medic.id} medic={medic} />);

    return (
        <div className="table">
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
                    {MedicRolls}
                </tbody>
            </table>
        </div>
    )
}

export default MedicTable;
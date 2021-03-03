import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderNav.css';


const HeaderNav = props => {
    return (
        <div className="nav">
            <Link className="link" to="/">Tabela de Médicos</Link>
            <Link className="link" to="/cadastro">Cadastrar Médico</Link>
            <Link className="link" to="/procurar">Procurar médico</Link>
            <Link className="link" to="/procurarEspecialidade">Procurar médicos(Especialidade)</Link>
        </div>
    )
}

export default HeaderNav
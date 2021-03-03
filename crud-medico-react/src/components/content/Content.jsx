import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Content.css';

const backendURL = 'http://18.230.75.29/medic';

class Content extends Component {

    state = {
        medics: []
    }

    getMedics() {
        axios.get(backendURL)
            .then(resp => resp.data)
            .then(medics => this.setState({ medics: medics }))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getMedics();
    }

    renderTable() {
        return (
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
                    {this.renderRolls()}
                </tbody>
            </table>
        )
    }

    renderRolls() {
        return this.state.medics.map(medic => {
            return (
                <tr key={medic.id}>
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
            )
        })
    }

    render() {
        return (
            <div className="table">
                { this.renderTable() }
            </div>
        )
    }
}


export default Content;
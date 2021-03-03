import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MedicSpecialty.css';
import axios from 'axios';

const backendUrl = 'http://18.230.75.29:3001/medic';

class MedicSpecialty extends Component {

    state = {
        specialty: '',
        medics: []
    }

    renderForm() {
        return (
            <form className="form">
                <div className="specialties">
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="ALERGOLOGIA" name="specialty" value="ALERGOLOGIA" />
                        <label htmlFor="ALERGOLOGIA">ALERGOLOGIA</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="ANGIOLOGIA" name="specialty" value="ANGIOLOGIA" />
                        <label htmlFor="ANGIOLOGIA">ANGIOLOGIA</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="BUCO MAXILO" name="specialty" value="BUCO MAXILO" />
                        <label htmlFor="BUCO MAXILO">BUCO MAXILO</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="CARDIOLOGIA CLÍNICA" name="specialty" value="CARDIOLOGIA CLÍNICA" />
                        <label htmlFor="CARDIOLOGIA CLÍNICA">CARDIOLOGIA CLÍNICA</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="CARDIOLOGIA INFANTIL" name="specialty" value="CARDIOLOGIA INFANTIL" />
                        <label htmlFor="CARDIOLOGIA INFANTIL">CARDIOLOGIA INFANTIL</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="CIRURGIA CABEÇA E PESCOÇO" name="specialty" value="CIRURGIA CABEÇA E PESCOÇO" />
                        <label htmlFor="CIRURGIA CABEÇA E PESCOÇO">CIRURGIA CABEÇA E PESCOÇO</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="CIRURGIA CARDÍACA" name="specialty" value="CIRURGIA CARDÍACA" />
                        <label htmlFor="CIRURGIA CARDÍACA">CIRURGIA CARDÍACA</label>
                    </div>
                    <div>
                        <input type="radio" onChange={e => this.setSpecialty(e)} id="CIRURGIA DE TÓRAX" name="specialty" value="CIRURGIA DE TÓRAX" />
                        <label htmlFor="CIRURGIA DE TÓRAX">CIRURGIA DE TÓRAX</label>
                    </div>
                </div>
                { this.renderButton()}
            </form>
        )
    }

    validateForm() {
        const validSpecialty = !!this.state.specialty;

        return !validSpecialty;
    }

    setSpecialty(event) {
        const newState = { ...this.state };
        newState.specialty = event.target.value;
        this.setState({ ...newState });
    }

    renderButton() {
        return (
            <button className="specialtyButton" disabled={this.validateForm()} onClick={e => this.getMedics(e)}>Pesquisar</button>
        )
    }

    renderMedics() {
        if (!this.state.medics[0]) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <div className="medicOne">
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
                            {this.state.medics.map(medic => this.renderMedic(medic))}
                        </tbody>
                    </table>
                </div>

            )
        }
    }

    renderMedic(medic) {
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
    }

    getMedics(event) {
        event.preventDefault()
        axios.get(`${backendUrl}/specialties/${this.state.specialty}`)
            .then(response => response.data)
            .then(medics => {
                const newState = { ...this.state };
                newState.medics = medics;
                this.setState({ ...newState });
                this.forceUpdate();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderMedics()}
            </div>
        )
    }

}

export default MedicSpecialty;
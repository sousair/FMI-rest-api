import React, { Component } from 'react';
import './EditMedic.css';
import axios from 'axios';

const backendUrl = 'http://18.230.75.29:3001/medic'

class EditMedic extends Component {

    state = {
        name: '',
        crm: '',
        tel: '',
        cel: '',
        cep: '',
        specialties: []
    }

    changeStringState(event) {
        const newState = { ...this.state };
        newState[event.target.name] = event.target.value;
        this.setState({ ...newState });
    }

    changeArrayState(event) {
        let newState = { ...this.state };
        if (newState.specialties.includes(event.target.name)) {
            newState.specialties = newState.specialties.filter(specialitie => specialitie !== event.target.name);
        } else newState.specialties.push(event.target.name);

        this.setState({ ...newState });
    }

    checked(value) {
        return !!this.state.specialties.find(specialty => specialty === value);
    }

    verifyNumbersArray (string, length) {
        if(string) {
            return string.split('').filter(digit => parseInt(digit) <= 9).length === length;
        } else return false;
    }

    formVerification() {
        const validName = !!this.state.name;
        const validCrm = this.verifyNumbersArray(this.state.crm, 7);
        const validCep = this.verifyNumbersArray(this.state.cep, 8);
        const validTel = this.verifyNumbersArray(this.state.tel, 8);
        const validCel = this.verifyNumbersArray(this.state.cel, 12);
        const validSpecialties = this.state.specialties.length > 1;

        return !(validName && validCrm && validCep && validTel && validCel &&  validSpecialties);
    }

    renderForm() {
        return (
            <form className="form">
                <div className="labels">
                    <label>Nome</label>
                    <label>CRM</label>
                    <label>Tel</label>
                    <label>Cel</label>
                    <label>CEP</label>
                    <label>Especialidades(min: 2)</label>
                </div>
                <div className="inputs">
                    <input type="text" name="name" value={this.state.name} onChange={e => this.changeStringState(e)} placeholder="Nome" />
                    <input type="text" name="crm" value={this.state.crm} onChange={e => this.changeStringState(e)} placeholder="1234567" />
                    <input type="text" name="tel" value={this.state.tel} onChange={e => this.changeStringState(e)} placeholder="12345678" />
                    <input type="text" name="cel" value={this.state.cel} onChange={e => this.changeStringState(e)} placeholder="DDD912345678" />
                    <input type="text" name="cep" value={this.state.cep} onChange={e => this.changeStringState(e)} placeholder="12345678" />
                    <div className="specialties">
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('ALERGOLOGIA')} name="ALERGOLOGIA" />
                            <label>ALERGOLOGIA</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('ANGIOLOGIA')} name="ANGIOLOGIA" />
                            <label>ANGIOLOGIA</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('BUCO MAXILO')} name="BUCO MAXILO" />
                            <label>BUCO MAXILO</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('CARDIOLOGIA CLÍNICA')} name="CARDIOLOGIA CLÍNICA" />
                            <label>CARDIOLOGIA CLÍNICA</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('CARDIOLOGIA INFANTIL')} name="CARDIOLOGIA INFANTIL" />
                            <label>CARDIOLOGIA INFANTIL</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('CIRURGIA CABEÇA E PESCOÇO')} name="CIRURGIA CABEÇA E PESCOÇO" />
                            <label>CIRURGIA CABEÇA E PESCOÇO</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('CIRURGIA CARDÍACA')} name="CIRURGIA CARDÍACA" />
                            <label>CIRURGIA CARDÍACA</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={e => this.changeArrayState(e)} checked={this.checked('CIRURGIA DE TÓRAX')} name="CIRURGIA DE TÓRAX" />
                            <label>CIRURGIA DE TÓRAX</label>
                        </div>
                    </div>
                </div>
            </form >
        )
    }

    renderButtons() {
        return (
            <div className="editButtons">
                <button className="editButton" disabled={this.formVerification()} onClick={e => this.update()}>Alterar</button>
                <button className="editButton" onClick={e => this.delete()}>"Deletar"</button>
            </div>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`${backendUrl}/id/${id}`)
            .then(response => response.data)
            .then(medic => {
                medic.cep = medic.cep.split('').filter(digit => parseInt(digit) <= 9).join('');
                medic.crm = medic.crm.split('').filter(digit => parseInt(digit) <= 9).join('');

                this.setState({ ...medic })
            })
            .catch(error => console.log(error));
    }

    update() {
        axios.put(`${backendUrl}/${this.state.id}`, this.state)
            .then(_ => console.log('Alterado com sucesso'))
            .catch(error => console.log(error));
    }

    delete() {
        axios.delete(`${backendUrl}/${this.state.id}`)
            .then(_ => console.log(_ , 'Deletado com sucesso'))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderButtons()}
            </div>
        )
    }

}

export default EditMedic;
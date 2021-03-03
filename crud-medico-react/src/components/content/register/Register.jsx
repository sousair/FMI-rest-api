import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';

const backendUrl = 'http://localhost:3001/medic';

class Register extends Component {

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
        if(newState.specialties.includes(event.target.name)) {
            newState.specialties = newState.specialties.filter(specialitie => specialitie !== event.target.name);
        }else newState.specialties.push(event.target.name);

        this.setState({ ...newState });
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

    register() {
        axios.post(backendUrl, { ...this.state })
            .then(_ => console.log('Cadastrado com sucesso'))
            .catch(error => console.log(error))
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
                            <input type="checkbox" name="ALERGOLOGIA" onChange={e => this.changeArrayState(e)} />
                            <label>ALERGOLOGIA</label>
                        </div>
                        <div>
                            <input type="checkbox" name="ANGIOLOGIA" onChange={e => this.changeArrayState(e)} />
                            <label>ANGIOLOGIA</label>
                        </div>
                        <div>
                            <input type="checkbox" name="BUCO MAXILO" onChange={e => this.changeArrayState(e)} />
                            <label>BUCO MAXILO</label>
                        </div>
                        <div>
                            <input type="checkbox" name="CARDIOLOGIA CLÍNICA" onChange={e => this.changeArrayState(e)} />
                            <label>CARDIOLOGIA CLÍNICA</label>
                        </div>
                        <div>
                            <input type="checkbox" name="CARDIOLOGIA INFANTIL" onChange={e => this.changeArrayState(e)} />
                            <label>CARDIOLOGIA INFANTIL</label>
                        </div>
                        <div>
                            <input type="checkbox" name="CIRURGIA CABEÇA E PESCOÇO" onChange={e => this.changeArrayState(e)} />
                            <label>CIRURGIA CABEÇA E PESCOÇO</label>
                        </div>
                        <div>
                            <input type="checkbox" name="CIRURGIA CARDÍACA" onChange={e => this.changeArrayState(e)} />
                            <label>CIRURGIA CARDÍACA</label>
                        </div>
                        <div>
                            <input type="checkbox" name="CIRURGIA DE TÓRAX" onChange={e => this.changeArrayState(e)} />
                            <label>CIRURGIA DE TÓRAX</label>
                        </div>
                    </div>
                </div>
            </form >
        )
    }

    renderButton() {
        return (
            <div className="button">
                <button disabled={this.formVerification()} onClick={e => this.register()}>Cadastrar</button>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderButton()}
            </div>
        )
    }

}

export default Register;
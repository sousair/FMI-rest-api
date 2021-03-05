import React, { Component } from 'react';
import './SearchMedic.css';
import MedicTable from '../MedicTable/MedicTable';
import axios from 'axios';

const placeholders = {
    id: 'Número do ID',
    name: 'Nome completo',
    crm: '1234567',
    cep: '12345678',
    tel: '12345678',
    cel: 'DDD912345678',
    logradouro: 'Nome completo da Rua',
    bairro: 'Nome do bairro',
    localidade: 'Nome da cidade',
    uf: 'Sigla do estado'
}

const backendUrl = 'http://18.230.75.29:3001/medic';

class SearchMedic extends Component {
    state = {
        type: '',
        value: '',
        medic: {}
    }

    setType(event) {
        const newState = { ...this.state };
        newState.type = event.target.value;

        this.setState({ ...newState });
        this.forceUpdate();
    }

    setTypeValue(event) {
        const newState = { ...this.state };
        newState.value = event.target.value;

        this.setState({ ...newState });
    }

    verifyNumbersArray(string, length) {
        if (string) {
            return string.split('').filter(digit => parseInt(digit) <= 9).length === length;
        } else return false;
    }

    validateForm() {
        const validType = !!this.state.type;
        let validValue;

        switch (this.state.type) {
            case 'crm': {
                validValue = this.verifyNumbersArray(this.state.value, 7);
                break;
            }
            case 'cep': {
                validValue = this.verifyNumbersArray(this.state.value, 8);
                break;
            }
            case 'tel': {
                validValue = this.verifyNumbersArray(this.state.value, 8);
                break;
            }
            case 'cel': {
                validValue = this.verifyNumbersArray(this.state.value, 12)
                break;
            }
            default: {
                validValue = !!this.state.value;
            }
        }

        return !(validType && validValue);
    }

    renderForm() {
        return (
            <form className="form">
                <div className="form-radio">
                    <div>
                        <input type="radio" id="id" name="type" value="id" onChange={e => this.setType(e)} />
                        <label htmlFor="id">ID</label>
                    </div>
                    <div>
                        <input type="radio" id="name" name="type" value="name" onChange={e => this.setType(e)} />
                        <label htmlFor="name">Nome</label>
                    </div>
                    <div>
                        <input type="radio" id="crm" name="type" value="crm" onChange={e => this.setType(e)} />
                        <label htmlFor="crm">CRM</label>
                    </div>
                    <div>
                        <input type="radio" id="cep" name="type" value="cep" onChange={e => this.setType(e)} />
                        <label htmlFor="cep">CEP</label>
                    </div>
                    <div>
                        <input type="radio" id="tel" name="type" value="tel" onChange={e => this.setType(e)} />
                        <label htmlFor="tel">Telefone</label>
                    </div>
                    <div>
                        <input type="radio" id="cel" name="type" value="cel" onChange={e => this.setType(e)} />
                        <label htmlFor="cel">Celular</label>
                    </div>
                    <div>
                        <input type="radio" id="logradouro" name="type" value="logradouro" onChange={e => this.setType(e)} />
                        <label htmlFor="logradouro">Rua</label>
                    </div>
                    <div>
                        <input type="radio" id="bairro" name="type" value="bairro" onChange={e => this.setType(e)} />
                        <label htmlFor="bairro">Bairro</label>
                    </div>
                    <div>
                        <input type="radio" id="localidade" name="type" value="localidade" onChange={e => this.setType(e)} />
                        <label htmlFor="localidade">Cidade</label>
                    </div>
                    <div>
                        <input type="radio" id="uf" name="type" value="uf" onChange={e => this.setType(e)} />
                        <label htmlFor="uf">Estado</label>
                    </div>
                </div>
                <div className="text-input">
                    <input type="text" value={this.state.value} placeholder={placeholders[this.state.type] || ''} onChange={e => this.setTypeValue(e)} />
                    {this.renderButton()}
                </div>
            </form>
        )
    }

    renderButton() {
        return (
            <div className="searchButton">
                <button disabled={this.validateForm()} onClick={e => this.getMedic(e)} >Procurar</button>
            </div>
        )
    }

    getMedic(event) {
        event.preventDefault()

        axios.get(`${backendUrl}/${this.state.type}/${this.state.value}`)
            .then(response => response.data)
            .then(medic => {
                delete medic.isDeleted
                const newState = { ...this.state };
                newState.medic = medic

                this.setState({ ...newState })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                { this.renderForm() }
                { this.state.medic.id ? <MedicTable medics={ [this.state.medic] } /> : '' }
            </div>
        )
    }

}

export default SearchMedic;
import React, { Component } from 'react';
import MedicTable from './MedicTable/MedicTable';
import axios from 'axios';
import './Content.css';

const backendURL = 'http://18.230.75.29:3001/medic';

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

    render() {
        this.getMedics();
        return (
            <div className="table">
                <MedicTable medics={ this.state.medics } />
            </div>
        )
    }
}


export default Content;
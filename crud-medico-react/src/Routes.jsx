import React from 'react';
import { Switch, Route } from 'react-router';

import Content from './components/content/Content';
import Register from './components/content/register/Register';
import SearchMedic from './components/content/searchMedic/SearchMedic';
import MedicSpecialty from './components/content/searchMedicSpecialty/MedicSpecialty';
import EditMedic from './components/content/edit/EditMedic';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Content }></Route>
            <Route path="/cadastro" component={ Register } ></Route>
            <Route path="/procurar" component={ SearchMedic }></Route>
            <Route path="/procurarEspecialidade" component={ MedicSpecialty }></Route>
            <Route path="/editar/:id" component={ EditMedic }></Route>
        </Switch>
    )
}

export default Routes;
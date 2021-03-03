import React from 'react';
import './App.css';
import HeaderNav from './components/header-nav/HeaderNav';

import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <HeaderNav />
                <Routes />
            </div>
        </BrowserRouter>
    )
}

export default App;
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';


export default function App() {
    return(
        <BrowserRouter>
            <ScrollTop/>
            <Switch>
                <Route path="/" component={Home} exact />
            </Switch>
        </BrowserRouter>
    );
}

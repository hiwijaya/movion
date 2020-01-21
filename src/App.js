import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import Person from './pages/Person';
import Persons from './pages/Persons';
import Search from './pages/Search';


export default function App() {
    return(
        <BrowserRouter>
            <ScrollTop/>
            <Switch>
                <Route path="/search" component={Search} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/movie" component={Movies} />
                <Route path="/person/:id" component={Person} />
                <Route path="/person" component={Persons} />
                <Route path="/" component={Home} exact />
            </Switch>
        </BrowserRouter>
    );
}

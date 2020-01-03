import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Menubar.css';
import home from '../../images/icon/home.svg';
import film from '../../images/icon/film.svg';
import people from '../../images/icon/people.svg';
import search from '../../images/icon/search.svg';


export default class Menubar extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentMenu: 'home'
        }

    }


    renderMenu(url, icon, selected){
        const indicator = {
            borderRight: '5px solid #FFE170'
        }
        return(
            <div class="menu" style={(selected) ? indicator : null}>
                <Link to={url}>
                    <img src={icon} alt="Home Menu"/>
                </Link>
            </div>
        );
    }

    render() {
        return(
            <div class="menubar">
                {this.renderMenu('/', home, true)}
                {this.renderMenu('/movie', film, false)}
                {this.renderMenu('/person', people, false)}
                {this.renderMenu('/', search, false)}
            </div>
        );
    }
}
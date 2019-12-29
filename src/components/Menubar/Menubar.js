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


    renderMenu(icon, selected){
        const indicator = {
            borderRight: '5px solid #FFE170'
        }
        return(
            <Link>
                <div class="menu" style={(selected) ? indicator : null}>
                    <img src={icon} alt="Home Menu"/>
                </div>
            </Link>
        );
    }

    render() {
        return(
            <div class="menubar">
                {this.renderMenu(home, true)}
                {this.renderMenu(film, false)}
                {this.renderMenu(people, false)}
                {this.renderMenu(search, false)}
            </div>
        );
    }
}
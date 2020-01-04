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
                    <img src={icon} alt="Menu"/>
                </Link>
            </div>
        );
    }
    
    handleSearch() {
        this.props.onSearchPress();
    }

    render() {
        return(
            <div class="menubar">
                {this.renderMenu('/', home, true)}
                {this.renderMenu('/movie', film, false)}
                {this.renderMenu('/person', people, false)}
                <div class="menu" style={(false) ? {borderRight: '5px solid #FFE170'} : null}
                    role="button" onClick={() => this.handleSearch()}>
                    <img src={search} alt="Search"/>
                </div>
            </div>
        );
    }
}
Menubar.defaultProps = {
    onSearchPress: () => {}
}
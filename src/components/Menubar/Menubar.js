import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Menubar.css';
import home from '../../images/icon/home.svg';
import film from '../../images/icon/film.svg';
import people from '../../images/icon/people.svg';
import search from '../../images/icon/search.svg';
import Discover from '../Discover';


class Menubar extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentMenu: 'home'
        }

        this.discover = null;
    }

    componentDidMount() {
        const route = this.props.location.pathname;
        if(route === '/'){
            this.setState({currentMenu: 'home'});
        }
        else if(route === '/movie'){
            this.setState({currentMenu: 'movie'});
        }
        else if(route === '/person'){
            this.setState({currentMenu: 'person'});
        }
        else if(route === '/search'){
            this.setState({currentMenu: 'search'});
        }
    }


    renderMenu(url, icon, menu){
        return(
            <a href={url} className={(this.state.currentMenu === menu) ? 'menu indicator' : 'menu'}>
                <img src={icon} alt="Menu"/>
            </a>
        );
    }

    render() {
        return(
            <div class="menubar">
                <Discover ref={(ref) =>{this.discover = ref}}/>
                
                {this.renderMenu('/', home, 'home')}
                {this.renderMenu('/movie', film, 'movie')}
                {this.renderMenu('/person', people, 'person')}

                <div class="menu" style={(this.state.currentMenu === 'search') ? this.indicatorStyle : null}
                    role="button" onClick={() => { this.discover.toggle(); }}>
                    <img src={search} alt="Search"/>
                </div>
                
            </div>
        );
    }
}
export default withRouter(Menubar);
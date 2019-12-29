import React, {Component} from 'react';
import './Headline.css';
import { Link } from 'react-router-dom';
import backdrop from '../../images/backdrop2.jpg';


export default class Headline extends Component {

    
    render() {
        const background = {
            backgroundImage: `linear-gradient(90deg,#000,transparent 50%,transparent), url(${backdrop})`,
        }
        return(
            <div class="headline">
                <div class="desc">
                    Description...
                </div>
                <div class="backdrop" style={background}></div>
            </div>
        );
    }

}
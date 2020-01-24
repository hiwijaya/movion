import React, { Component } from 'react';
import Menubar from '../components/Menubar';
import Footer from '../components/Footer';
import logo from '../images/logo.png';


export default class Credits extends Component {
    
    render() {
        return (
            <div>
                <Menubar/>
                <div class="content">
                    <div class="credits">
                        <img src={logo} class="logo" alt="Movion"/>
                        <div>by <a href="https://hiwijaya.com" target="_blank">Happy Indra Wijaya</a></div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

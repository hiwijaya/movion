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
                        <h1 class="title">Movion</h1>
                        <div>by <a href="https://hiwijaya.com" target="_blank">Happy Indra Wijaya</a></div>
                        <p>
                            For my Father, <br/>
                            Who always love watching a superhero movies. <br/>
                            When I was six the first time he took me to the cinema 
                            to watch <a href="/movie/11551">Small Soldier</a>. <br/>
                            Thank you Papa. :)
                        </p>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

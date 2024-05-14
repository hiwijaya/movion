import React from 'react';
import './Footer.css';
import tmdb from '../../images/tmdb.svg'


export default function Footer() {

    return(
        <div class="footer">
            <p>© 2024 Happy Indra Wijaya. All rights reserved. <a href="/credits">Credits</a>. </p>
            <p>Powered by &nbsp;
                <a class="tmdb" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                <img src={tmdb} alt="TMDB"/>
                </a></p>
        </div>
    );
}
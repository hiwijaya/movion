import React from 'react';
import './Footer.css';


export default function Footer() {

    return(
        <div class="footer">
            <p>© 2021 Happy Indra Wijaya. All rights reserved. <a href="/credits">Credits</a>. </p>
            <p>Powered by <a class="tmdb" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a></p>
        </div>
    );
}
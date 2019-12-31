import React from 'react';
import './Poster.css';
import {Link} from 'react-router-dom';


function Poster({movie}) {

    return(
        <Link to="/">
            <div class="poster">
                <img class="image-poster" src={movie.poster} alt="Poster"/>
                <h5>{movie.title}</h5>
            </div>
        </Link>
    );
}
Poster.defaultProps = {
    movie: {
        poster: '',
        title: ''
    }
}
export default Poster;
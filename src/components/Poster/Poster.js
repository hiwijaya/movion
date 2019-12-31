import React from 'react';
import './Poster.css';
import {Link} from 'react-router-dom';
import Rating from '../Rating/Rating';


function Poster({movie}) {

    return(
        <Link to="/">
            <div class="poster">
                <img class="image" src={movie.poster} alt="Poster"/>
                <h5 class="title">{movie.title}</h5>
                <div class="chorizontal">
                    <Rating rate="7.8"/>
                    <h5 class="year">{movie.releaseYear}</h5>
                </div>
            </div>
        </Link>
    );
}
Poster.defaultProps = {
    movie: {
        poster: '',
        title: '',
        releaseYear: ''
    }
}
export default Poster;
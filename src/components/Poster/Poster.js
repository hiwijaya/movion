import React from 'react';
import './Poster.css';
import {Link} from 'react-router-dom';
import Rating from '../Rating/Rating';


function Poster({movie, more}) {

    if(more !== null){
        return(
            <Link to={more}>
                <div class="poster center explore">
                    <h5>See All</h5>
                </div>
            </Link>
        );
    }

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
    },
    more: null
}
export default Poster;
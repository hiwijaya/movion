import React from 'react';
import './Poster.css';
import Rating from '../Rating/Rating';


function Poster({movie, width, more}) {

    const posterWidth = {
        width
    }

    if(more !== null){
        return(
            <a href={more}>
                <div class="poster center explore" style={posterWidth}>
                    <h5>See All</h5>
                </div>
            </a>
        );
    }

    return(
        <a href={`/movie/${movie.id}`}>
            <div class="poster" style={posterWidth}>
                <div class="image">
                    <img src={movie.poster} alt="Poster"/>
                </div>
                <h5 class="title">{movie.title}</h5>
                <div class="chorizontal">
                    <Rating rate={movie.rate}/>
                    <h5 class="year">{movie.releaseYear}</h5>
                </div>
            </div>
        </a>
    );
}
Poster.defaultProps = {
    movie: {
        poster: '',
        title: '',
        releaseYear: ''
    },
    width: '240px',     // TODO: consider to change with dynamic class instead
    more: null
}
export default Poster;
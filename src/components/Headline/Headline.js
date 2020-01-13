import React from 'react';
import './Headline.css';
import { Link } from 'react-router-dom';
import play from '../../images/icon/play.svg';
import Rating from '../Rating';
import * as Lib from '../../utils/Lib';


function renderTrailerButton(onTrailerPress) {
    return(
        <button type="button" class="trailer-button center" onClick={() => onTrailerPress()}>
            <img src={play} alt="play"/>
            <h5> Watch Trailer</h5>
        </button>
    );
}

function Headline({movie, onTrailerPress}) {

    const background = {
        backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${movie.backdrop})`
    }

    return (
        <div class="headline">
            <span/>
            <div class="backdrop" style={background}></div>
            <div class="desc cvertical">
                <Link to={`/movie/${movie.id}`}>
                    <h1>{movie.title}</h1>
                </Link>
                <div class="info chorizontal">
                    <Rating rate={movie.rate}/>
                    <h5>{`${movie.vote} reviews`}</h5>
                    <h5>{movie.shortGenre}</h5>
                    <h5>{movie.duration}</h5>
                    <h5>{movie.releaseYear}</h5>
                </div>
                <p>
                    {Lib.getShortOverview(movie.overview)}
                </p>
                {renderTrailerButton(onTrailerPress)}
            </div>
        </div>
    );
}
Headline.defaultProps = {
    movie: {
        id: '',
        backdrop: '',
        title: '',
        rate: 0,
        vote: '',
        shortGenre: '',
        releaseYear: '',
        duration: '',
        overview: ''
    },
    onTrailerPress: () => {} 
}
export default Headline;
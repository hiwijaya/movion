import React, {Component} from 'react';
import './Headline.css';
import { Link } from 'react-router-dom';
import backdrop from '../../images/backdrop2.jpg';
import play from '../../images/icon/play.svg';
import Rating from '../Rating';



function renderTrailerButton() {
    return(
        <button type="button" class="trailer-button center">
            <img src={play} alt="play"/>
            <h5> Watch Trailer</h5>
        </button>
    );
}

function Headline({movie}) {

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
                    <h5>Adventure/Family</h5>
                    <h5>2019</h5>
                    <h5>1h 58m</h5>
                    <h5>Cert. PG</h5>
                </div>
                <p>
                    Maleficent and her goddaughter Aurora begin to question the complex family ties that bind them as 
                    they are pulled in different directions by impending nuptials, unexpected allies, and dark new...
                </p>
                {renderTrailerButton()}
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
        duration: '?',
        cert: '?'
    },    
}
export default Headline;
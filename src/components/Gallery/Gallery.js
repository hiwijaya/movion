import React from 'react';
import './Gallery.css';
import Poster from '../Poster';
import logo from '../../images/logo.png'


function Gallery({movies}){

    return(
        <div class="gallery">
            <span class="pad"/>
            {
                movies.map((movie, i) => (
                    // <img key={i} src={logo} alt="test"/>
                    <Poster key={movie.id} movie={movie}/>
                ))
            }
            <span class="pad"/>
        </div>
    );
}
Gallery.defaultProps = {
    movies: []
}
export default Gallery
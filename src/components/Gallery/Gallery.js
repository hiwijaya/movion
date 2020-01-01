import React from 'react';
import './Gallery.css';
import Poster from '../Poster';


function Gallery({movies, more}){

    if(more !== null){
        let m = {
            id: '00',
            more: more
        }
        movies.push(m);
    }

    return(
        <div class="gallery">
            <span class="pad"/>
            {
                movies.map((movie, i) => (
                    // <img key={i} src={logo} alt="test"/>
                    <Poster key={movie.id} movie={movie} more={movie.more}/>
                ))
            }
            <span class="pad"/>
        </div>
    );
}
Gallery.defaultProps = {
    movies: [],
    more: null
}
export default Gallery
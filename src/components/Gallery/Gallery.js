import React from 'react';
import './Gallery.css';
import Poster from '../Poster';
import Cast from '../Cast';


function Gallery({movies, cast}){

    return(
        <div class="gallery">
            <span class="pad"/>
            {
                movies.map((movie, i) => (
                    <Poster key={movie.id} movie={movie} more={movie.more}/>
                ))
            }
            {
                cast.map((person, i) => (
                    <Cast key={person.id} person={person} asCast={"character" in person}/>
                ))
            }
            <span class="pad"/>
        </div>
    );
}
Gallery.defaultProps = {
    movies: [],
    cast: []
}
export default Gallery
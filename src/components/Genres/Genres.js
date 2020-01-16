import React from 'react';
import './Genres.css';
import { GENRES } from '../../services/MovieService';


export default function Genres() {

    return(
        <div class="genres">
            <span class="pad"/>
            {
                GENRES.map((genre, i) => (
                    <a key={i} href={`/movie?genre=${genre.id}`}>
                        <h5>{genre.name}</h5>
                    </a>
                ))
            }
            <span class="pad"/>
        </div>
    );
}
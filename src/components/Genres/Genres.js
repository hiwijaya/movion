import React from 'react';
import './Genres.css';
import { GENRES } from '../../services/MovieService';


export default function Genres() {

    return(
        <div class="genres">
            {
                GENRES.map((genre, i) => (
                    <div key={i}>
                        <h4>{genre.name}</h4>
                    </div>
                ))
            }
        </div>
    );
}
import React from 'react';
import './Cast.css'


export default function Cast({person}) {

    return(
        <a href={`/person/${person.id}`}>
            <div class="cast">
                <img src={person.photo} alt="Profile"/>
                <h5 class="name">{person.name}</h5>
                <h5 class="character">{person.character}</h5>
            </div>
        </a>
    );
}
Cast.defaultProps = {
    person: {
        id: '',
        photo: '',
        name: '',
    }
}
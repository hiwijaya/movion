import React from 'react';
import './Cast.css'


export default function Cast({person, inGallery}) {

    return(
        <a href={`/person/${person.id}`} className={(inGallery) ? 'cast' : 'cast cast-grid'}>
            <div class="image">
                 <img src={person.photo} alt="Profile"/>
            </div>
            <h5 class="name">{person.name}</h5>
            <h5 class="character">{person.character}</h5>
        </a>
    );
}
Cast.defaultProps = {
    person: {
        id: '',
        photo: '',
        name: '',
        character: '',
    },
    inGallery: true
}
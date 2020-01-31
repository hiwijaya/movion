import React from 'react';
import './Cast.css';
import image from '../../images/icon/image.svg';


export default function Cast({person, inGallery, asCast}) {

    let castClass = 'cast';
    castClass = (inGallery) ? 'cast' : 'cast cast-grid';
    castClass = (asCast) ? ' cast as-cast' : castClass;

    return(
        <a href={`/person/${person.id}`} className={castClass}>
            {
                (person.photo === null) ? 
                (<div class="default-photo">
                    <img src={image} alt="Profile"/>
                </div>) : 
                (<div class="photo">
                    <img src={person.photo} alt="Profile"/>
                </div>)
            }
            <h5 class="name">{person.name}</h5>
            <h5 class="character">{person.character}</h5>
        </a>
    );
}
Cast.defaultProps = {
    person: {
        id: '',
        photo: null,
        name: '',
        character: '',
    },
    inGallery: true,
    asCast: false
}
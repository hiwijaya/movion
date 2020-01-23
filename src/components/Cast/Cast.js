import React from 'react';
import './Cast.css';
import image from '../../images/icon/image.svg';


export default function Cast({person, inGallery}) {

    return(
        <a href={`/person/${person.id}`} className={(inGallery) ? 'cast' : 'cast cast-grid'}>
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
    inGallery: true
}
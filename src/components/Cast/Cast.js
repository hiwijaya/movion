import React from 'react';
import './Cast.css'
import {Link} from 'react-router-dom';


export default function Cast({person}) {

    return(
        <Link to={`/person/${person.id}`}>
            <div class="cast">
                <img src={person.photo} alt="Profile"/>
                <h5 class="name">{person.name}</h5>
            </div>
        </Link>
    );
}
Cast.defaultProps = {
    person: {
        id: '',
        photo: '',
        name: '',
    }
}
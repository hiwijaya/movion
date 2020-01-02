import React from 'react';
import './Social.css';
import globe from '../../images/icon/globe.svg';
import facebook from '../../images/icon/facebook.svg';
import instagram from '../../images/icon/instagram.svg';
import twitter from '../../images/icon/twitter.svg';
import imdb from '../../images/icon/imdb.svg';


export default function Social({ids}){

    return(
        <div class="social">
            {(ids.homepage !== '') && <a href={ids.homepage} target="_blank"><img src={globe} alt="homepage"/></a>}
            {(ids.facebook_id !== null) && <a href={`https://www.facebook.com/${ids.facebook_id}`} target="_blank"><img src={facebook} alt="homepage"/></a>}
            {(ids.instagram_id !== null) && <a href={`https://instagram.com/${ids.instagram_id}`} target="_blank"><img src={instagram} alt="homepage"/></a>}
            {(ids.twitter_id !== null) && <a href={`https://twitter.com/${ids.twitter_id}`} target="_blank"><img src={twitter} alt="homepage"/></a>}
            {(ids.imdb_id !== null) && <a href={`https://www.imdb.com/title/${ids.imdb_id}`} target="_blank"><img src={imdb} alt="homepage"/></a>}
        </div>
    );
}
Social.defaultProps = {
    ids: {
        homepage: '',
        facebook_id: null,
        instagram_id: null,
        twitter_id: null,
        imdb_id: null
    }
}
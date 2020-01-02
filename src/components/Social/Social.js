import React from 'react';
import './Social.css';


const Homepage = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#80868B" stroke-width="1.5" 
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    );
}

const Facebook = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#80868B" stroke-width="1.5" 
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    );
}

const Intagram = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#80868B" stroke-width="1.5" 
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
}

const Twitter = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#80868B" stroke-width="1.5" 
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
    );
}

const IMDb = () => {
    return(
        <svg class="imdb" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#80868B">
            <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885v-2.866c0-.33-.004-.54-.033-.63a.292.292 0 0 0-.14-.204z"></path>
            <path d="M22.416 0H1.62C.742.06.06.744 0 1.596V22.38c.06.874.712 1.542 1.555 1.617.015.003.03.003.045.003h20.845A1.727 1.727 0 0 0 24 22.29V1.71C24 .82 23.305.07 22.416 0zM4.792 15.626H2.887V8.26h1.905v7.366zm6.54-.002H9.67v-4.97L9 15.623H7.812l-.698-4.86-.007 4.86H5.44V8.26h2.468c.083.523.16 1.048.23 1.574l.27 1.87.442-3.444h2.483v7.364zm4.977-2.18c0 .655-.044 1.094-.104 1.32-.062.22-.17.4-.326.52-.15.13-.34.218-.57.266-.223.045-.57.075-1.02.075l-.004-.002H11.98V8.26h1.426c.914 0 1.45.047 1.77.128.325.09.575.225.745.42.165.18.273.404.313.645.05.235.076.705.076 1.402v2.588zm4.944.475c0 .45-.045.764-.09.99-.06.224-.195.404-.405.568-.226.166-.48.24-.78.24-.22 0-.5-.06-.68-.136a1.586 1.586 0 0 1-.515-.427l-.116.47H16.95V8.26l-.02-.003h1.8v2.4c.15-.175.315-.31.51-.4.196-.083.466-.127.69-.127.226-.003.45.036.66.115.17.07.32.185.436.33.09.125.15.27.18.42.03.138.044.43.044.87v2.054z"></path>
            <path d="M19.08 11.205c-.12 0-.194.04-.225.12-.03.08-.06.29-.06.624v1.946c0 .324.03.533.06.623.04.086.13.14.226.134.12 0 .272-.047.3-.14.03-.097.046-.32.046-.674l.03-.002v-1.89c0-.303-.015-.508-.06-.603-.044-.1-.195-.14-.315-.14z"></path>
        </svg>
    );
}


export default function Social({ids}){

    return(
        <div class="social">
            {(ids.homepage !== '') && <a href={ids.homepage} target="_blank"> <Homepage/> </a>}
            {(ids.facebook_id !== null) && <a href={`https://www.facebook.com/${ids.facebook_id}`} target="_blank"> <Facebook/> </a>}
            {(ids.instagram_id !== null) && <a href={`https://instagram.com/${ids.instagram_id}`} target="_blank"> <Intagram/> </a>}
            {(ids.twitter_id !== null) && <a href={`https://twitter.com/${ids.twitter_id}`} target="_blank"> <Twitter/> </a>}
            {(ids.imdb_id !== null) && <a href={`https://www.imdb.com/title/${ids.imdb_id}`} target="_blank"> <IMDb/> </a>}
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
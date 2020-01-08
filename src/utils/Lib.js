import moment from 'moment';


const API_KEY = '3acc7bbfaa9ab936046d3d1e717296df';

const URL = 'https://api.themoviedb.org/3';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';
const POSTER_URL = 'https://image.tmdb.org/t/p/w342';
const PROFILE_URL = 'https://image.tmdb.org/t/p/w185';


export function requestHeader() {
    return {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    }
}

export function requestURL(endpoint, params) {

    if (params === null) {
        params = [];
    }

    // add default params
    params.push({
        key: 'api_key',
        val: API_KEY
    });
    params.push({
        key: 'include_adult',
        val: false
    });
    params.push({
        key: 'include_video',
        val: false
    });

    let paramArr = [];
    for (let param of params) {
        const paramStr = param.key + '=' + param.val;
        paramArr.push(paramStr);
    }

    return URL + endpoint + '?' + paramArr.join('&');
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function now() {
    return moment().toDate();
}

export function oneMonthBefore() {
    return moment().subtract(1, 'months');
}

export function formatDate(date) {
    if (date !== null) {
        return moment(date).format('YYYY-MM-DD');
    }
    return '';
}

export function formatFullDate(date){
    if (date !== null) {
        return moment(date).format('D MMMM YYYY');
    }
    return '';
}

// 123m --> 2h 3m
export function formatMinutes(minutes) {
    if (minutes === null) {
        return '?';
    }

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (m === 0) {
        return h + 'h';
    }
    return h + 'h ' + m + 'm';

}

export function getYear(date) {
    if (date !== null) {
        return moment(date).year();
    }
    return '';
}

export function formatCurrency(amount) {
    if (amount === "") {
        return '0';
    }

    let formatedAmount = '';
    if (typeof amount === 'number') {
        formatedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        formatedAmount = parseFloat(amount.replace(/\,/g, "")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return '$' + formatedAmount;
}

export function handleNull(input, ifNull, result) {
    if (input === null || input === '' || input === 0 || input.length === 0) {
        return ifNull;
    }
    return result;
}

export function getBackdropURL(path) {
    return BACKDROP_URL + path;
}

export function getPosterURL(path) {
    return POSTER_URL + path;
}

export function getProfileURL(path) {
    return PROFILE_URL + path;
}

export function getVideoThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

// for /discover results
export function filterMovies(rawData) {
    let filteredData = [];
    for (let data of rawData) {

        // ignore movie with no poster or backdrop
        if (data.poster_path === null || data.backdrop_path === null) {
            continue;
        }

        const fd = {
            id: data.id,
            title: data.title,
            poster: getPosterURL(data.poster_path),
            backdrop: getBackdropURL(data.backdrop_path),
            rate: data.vote_average,
            vote: data.vote_count,
            releaseYear: getYear(data.release_date),
        }
        filteredData.push(fd);
    }
    return filteredData;
}

// for /movie result
export function filterMovie(rawData) {

    let ids = rawData.external_ids;
    ids.homepage = rawData.homepage;

    let movie = {
        id: rawData.id,
        title: rawData.title,
        overview: rawData.overview,
        poster: getPosterURL(rawData.poster_path),
        backdrop: getBackdropURL(rawData.backdrop_path),
        rate: rawData.vote_average,
        vote: rawData.vote_count,
        genres: rawData.genres,
        shortGenre: getShortGenre(rawData.genres),
        release: rawData.release_date,
        releaseYear: getYear(rawData.release_date),
        productions: productionList(rawData.production_companies),
        budget: handleNull(rawData.budget, '?', formatCurrency(rawData.budget)),
        revenue: handleNull(rawData.revenue, '?', formatCurrency(rawData.revenue)),
        duration: formatMinutes(rawData.runtime), // in minutes
        director: getDirector(rawData.credits.crew),
        cast: getTopCast(rawData.credits.cast), // {id, name, character, picture}
        // trailer: handleNull(rawData.videos.results, null, '12345'),
        social: ids,
        backdrops: rawData.images.backdrops,
        posters: rawData.images.posters,
        videos: rawData.videos.results
    }

    return movie;
}

export function filterPersons(rawData) {
    let filteredData = [];
    for (let data of rawData) {
        
        if (data.profile_path === null) {
            continue;
        }

        let fd = {
            id: data.id,
            name: data.name,
            photo: PROFILE_URL + data.profile_path
        }
        filteredData.push(fd);
    }
    return filteredData;
}

export function filterPerson(rawData) {
    let ids = rawData.external_ids;
    ids.homepage = rawData.homepage;

    let person = {
        id: rawData.id,
        name: rawData.name,
        photo: getProfileURL(rawData.profile_path),
        biography: rawData.biography,
        birthday: rawData.birthday,
        placeBirth: rawData.place_of_birth,
        social: ids,
        photos: rawData.images.profiles,
        // movie_credits filter
    }

    return person;
}


function getDirector(crew) {
    for (let c of crew) {
        if (c.job === 'Director') {
            return c.name;
        }
    }
    return '?';
}

function getTopCast(casts) {
    let cast = [];
    for (let i = 0; i < casts.length; i++) {

        if(casts[i].profile_path === null){
            continue;
        }

        if (cast.length >= 15) {
            break;
        }

        const c = {
            id: casts[i].id,
            name: casts[i].name,
            character: casts[i].character,
            photo: PROFILE_URL + casts[i].profile_path
        }
        cast.push(c);
    }

    return cast;
}

function getShortGenre(genres) {
    if (genres === null || genres.length === 0) {
        return '-';
    }
    if (genres.length < 2) {
        return genres[0].name;
    }

    return `${genres[0].name}/${genres[1].name}`;
}

export function getShortOverview(overview){
    const words = overview.split(' ');
    if(words.length > 31){
        return words.splice(0, 30).join(' ') + '...';
    }
    return overview
}

export function more(data, url) {
    let m = {
        id: '00',
        more: url
    }
    data.push(m);
    
    return data;
}

export function productionList(productions) {
    let companies = [];
    productions.map((p) => companies.push(p.name) );

    return companies.join(', ');
}

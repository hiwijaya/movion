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
    params.push({
        key: 'language',
        val: 'en-US'
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

// for /discover results
export function filterData(rawData) {
    let filteredData = [];
    for (let data of rawData) {

        // ignore movie with no poster or backdrop
        if (data.poster_path === null || data.backdrop_path === null) {
            continue;
        }

        const fd = {
            id: data.id,
            title: data.original_title,
            poster: getPosterURL(data.poster_path),
            backdrop: getBackdropURL(data.backdrop_path),
            rate: data.vote_average,
            vote: data.vote_count,
            genre: getGenre(data.genre_ids),
            // link: ...
        }
        filteredData.push(fd);
    }
    return filteredData;
}

// for /movie result
export function filterMovie(rawData) {
    let movie = {
        id: rawData.id,
        title: rawData.original_title,
        overview: rawData.overview,
        poster: getPosterURL(rawData.poster_path),
        backdrop: getBackdropURL(rawData.backdrop_path),
        rate: rawData.vote_average,
        vote: rawData.vote_count,
        genres: rawData.genres,
        release: rawData.release_date,
        releaseYear: getYear(rawData.release_date),
        productions: rawData.production_companies,
        budget: handleNull(rawData.budget, '?', formatCurrency(rawData.budget)),
        revenue: handleNull(rawData.revenue, '?', formatCurrency(rawData.revenue)),
        duration: formatMinutes(rawData.runtime), // in minutes
        director: getDirector(rawData.credits.crew),
        cast: getTopCast(rawData.credits.cast), // {id, name, character, picture}
        trailer: handleNull(rawData.videos.results, null, rawData.videos.results[0].key)
    }

    return movie;
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
        if (i > 4) {
            break;
        }

        const c = {
            id: casts[i].id,
            name: casts[i].name,
            character: casts[i].character,
            picture: PROFILE_URL + casts[i].profile_path
        }
        cast.push(c);
    }

    return cast;
}

function getGenre(ids) {
    if (ids === null || ids.length === 0) {
        return '-';
    }
    if (ids.length < 2) {
        return getGenreById(ids[0]);
    }

    const genre1 = getGenreById(ids[0]);
    const genre2 = getGenreById(ids[1]);

    return genre1 + '/' + genre2;
}

function getGenreById(id) {
    for (let g of GENRES) {
        if (id === g.id) {
            return g.name;
        }
    }
    return '-';
}


// hardcoded
export const GENRES = [{
        id: 28,
        name: 'Action'
    },
    {
        id: 12,
        name: 'Adventure'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 14,
        name: 'Fantasy'
    },
    {
        id: 36,
        name: 'History'
    },
    {
        id: 27,
        name: 'Horror'
    },
    {
        id: 10402,
        name: 'Music'
    },
    {
        id: 9648,
        name: 'Mystery'
    },
    {
        id: 10749,
        name: 'Romance'
    },
    {
        id: 878,
        name: 'Science Fiction'
    },
    {
        id: 10770,
        name: 'TV Movie'
    },
    {
        id: 53,
        name: 'Thriller'
    },
    {
        id: 10752,
        name: 'War'
    },
    {
        id: 37,
        name: 'Western'
    }
];

import * as Lib from '../utils/Lib';


export default class MovieService {

    // media: movie/person
    async getTrending(media, onSuccess) {
        try {
            const response = await fetch(Lib.requestURL(`/trending/${media}/day`, null), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let data = responseJson.results;
            if (media === 'movie') {
                let movies = Lib.filterMovies(data);
                onSuccess(movies);
            } else {
                let persons = Lib.filterPersons(data);
                onSuccess(persons)
            }

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }


    async discover(params, onSuccess) {
        try {
            const response = await fetch(Lib.requestURL('/discover/movie', params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let movies = responseJson.results;
            let pages = responseJson.total_pages;
            let total = responseJson.total_results;
            
            movies = Lib.filterMovies(movies);

            onSuccess(movies, pages, total);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }


    async getShowing(page, onSuccess) {
        const params = [
            { key: 'primary_release_date.gte', val: Lib.formatDate(Lib.oneMonthBefore()) },
            { key: 'primary_release_date.lte', val: Lib.formatDate(Lib.now()) },
            { key: 'sort_by', val: 'popularity.desc' },
            { key: 'page', val: page },
        ];
        this.discover(params, onSuccess);
    }

    async getIndonesianMovies(page, onSuccess) {
        const params = [
            { key: 'region', val: 'ID' },
            { key: 'with_original_language', val: 'id'},
            { key: 'sort_by', val: 'popularity.desc' },
            { key: 'page', val: page }
        ];
        this.discover(params, onSuccess);
    }

    async getPopularMovies(page, onSuccess) {
        const params = [
            { key: 'sort_by', val: 'vote_count.desc' },
            { key: 'page', val: page },
        ];
        this.discover(params, onSuccess);
    }

    async getUpcomingMovies(onSuccess) {
        const params = [
            { key: 'primary_release_date.gte', val: Lib.formatDate(Lib.now()) },
            { key: 'sort_by', val: 'popularity.desc' },
            { key: 'page', val: 1 },
        ];
        this.discover(params, onSuccess);
    }

    // TODO: put a logic to catch 'years keyword' on discover component
    async getMoviesByYear(year, page, onSuccess) {
        const params = [
            { key: 'primary_release_year', val: year },
            { key: 'sort_by', val: 'popularity.desc' },
            { key: 'page', val: page },
        ];
        this.discover(params, onSuccess);
    }

    async getMoviesByGenre(genre_id, page, onSuccess) {
        const params = [
            { key: 'with_genres', val: genre_id },
            { key: 'sort_by', val: 'popularity.desc' },
            { key: 'page', val: page },
        ];
        this.discover(params, onSuccess);
    }

    async search(keyword, page, onSuccess) {
        try{
            const params = [
                { key: 'query', val: keyword },
                { key: 'page', val: page },
            ];

            const response = await fetch(Lib.requestURL('/search/multi', params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let pages = responseJson.total_pages;
            let total = responseJson.total_results;
            let results = Lib.filterSearchResults(responseJson.results);
            onSuccess(results, pages, total);

        } catch(error) {
            console.log(error);
            this.handleError();
        }
    }

    

    async getSimilarMovies(id, onSuccess) {
        try {
            const url = `/movie/${id}/recommendations`;

            const response = await fetch(Lib.requestURL(url, null), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let movies = responseJson.results;
            movies = Lib.filterMovies(movies);

            onSuccess(movies);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }

    // TODO: set onError callback handle
    async getMovie(id, onSuccess) {
        try {
            const url = `/movie/${id}`;
            const params = [{
                key: 'append_to_response',
                val: 'external_ids,credits,videos,images'
            }]
            const response = await fetch(Lib.requestURL(url, params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            const movie = Lib.filterMovie(responseJson);

            onSuccess(movie);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }

    async getPerson(id, onSuccess) {
        try{
            const url = `/person/${id}`;
            const params = [{
                key: 'append_to_response',
                val: 'external_ids,movie_credits,images'
            }]
            const response = await fetch(Lib.requestURL(url, params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

             const person = Lib.filterPerson(responseJson);

             onSuccess(person);

        } catch(error) {
            console.log(error);
            this.handleError();
        }
    }

    async getPopularPersons(page, onSuccess) {
        try{
            const params = [{ key: 'page', val: page }];

            const response = await fetch(Lib.requestURL('/person/popular', params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let persons = Lib.filterPersons(responseJson.results);
            let pages = responseJson.total_pages;
            let total = responseJson.total_results;
            onSuccess(persons, pages, total)

        } catch(error) {
            console.log(error);
            this.handleError();
        }
    }

    getGenreById(id) {
        for (let g of GENRES) {
            if (id === g.id.toString()) {
                return g.name;
            }
        }
        return '-';
    }

    handleError() {
        alert('Oops, something went wrong. Please try again.');
    }
 

}

// hardcode
export const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
];

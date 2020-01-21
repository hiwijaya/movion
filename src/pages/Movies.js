import React, { Component, Fragment } from 'react';
import Menubar from '../components/Menubar';
import Genres from '../components/Genres';
import Gallery from '../components/Gallery';
import Poster from '../components/Poster';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';


export default class Movies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            discovering: false,
            label: '',
            movies: [],

            showingMovies: [],
            indonesianMovies: [],   // add dynamic localization
            popularMovies: [],
            upcomingMovies: [],

            loading: false
        }

        this.movieService = new MovieService();
        this.handleScroll = this.handleScroll.bind(this);

        this.page = 1;
        this.pages = 1;
        this.genre = null;
        this.category = null;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleParameters();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }



    handleParameters() {
        const genre = Lib.getParameter(this, 'genre');
        const category = Lib.getParameter(this, 'category');
        if(genre === null && category === null) {
            this.feed();
            return;
        }

        this.setState({discovering: true});
        if(genre !== null){
            this.genre = genre.trim();
            this.getMoviesByGenre(this.genre, this.page);
            return;
        }

        if(category !== null){
            this.category = category.toLowerCase().trim();
            this.getMoviesByCategory(this.category, this.page);
        }

    }


    feed() {
        this.movieService.getShowing(1, (movies) => {
            this.setState({
                showingMovies: Lib.more(movies, '/movie?category=showing')
            });
        });

        this.movieService.getIndonesianMovies(1, (movies) => {
            this.setState({
                indonesianMovies: Lib.more(movies, '/movie?category=indonesia')
            });
        });

        this.movieService.getPopularMovies(1, (movies) => {
            this.setState({
                popularMovies: Lib.more(movies, '/movie?category=popular')
            });
        });

        this.movieService.getUpcomingMovies((movies) => {   // /movie?category=upcoming
            this.setState({
                upcomingMovies: movies
            });
        });
    }

    getMoviesByGenre(genre, page) {

        this.setState({loading: true});

        this.movieService.getMoviesByGenre(genre, page, (movies, pages) => {

            let moreMovies = this.state.movies;
            moreMovies.push(...movies);

            this.setState({
                label: `Genre: ${this.movieService.getGenreById(genre)}`, 
                movies: moreMovies, 
                loading: false
            });

            this.pages = pages;
        });

        this.page += 1;
    }

    getMoviesByCategory(category, page) {

        this.setState({loading: true});

        switch(category){
            case 'showing':
                this.movieService.getShowing(page, (movies, pages) => {
                    let moreMovies = this.state.movies;
                    moreMovies.push(...movies);
                    this.setState({
                        label: 'Now Playing',
                        movies: moreMovies,
                        loading: false
                    });
                    this.pages = pages;
                });
                break;

            case 'indonesia':
                this.movieService.getIndonesianMovies(page, (movies, pages) => {
                    let moreMovies = this.state.movies;
                    moreMovies.push(...movies);
                    this.setState({
                        label: 'Indonesian Movies',
                        movies: moreMovies,
                        loading: false
                    });
                    this.pages = pages;
                });
                break;

            case 'popular':
                this.movieService.getPopularMovies(page, (movies, pages) => {
                    let moreMovies = this.state.movies;
                    moreMovies.push(...movies);
                    this.setState({
                        label: 'Most Popular',
                        movies: moreMovies,
                        loading: false
                    });
                    this.pages = pages;
                });
                break;
                
            default:
                console.log('Unknown category');
        }

        this.page += 1;
    }

    isBottom(e) {
        return e.getBoundingClientRect().bottom <= (window.innerHeight + 10);
    }

    handleScroll() {
        if(!this.state.discovering){
            return;
        }
        if(this.page > this.pages){
            return;
        }
        if(this.state.loading){
            return;
        }

        const content = document.getElementById('content-movies');
        if (this.isBottom(content)) {
            if(this.genre !== null){
                this.getMoviesByGenre(this.genre, this.page);
            }
            else if(this.category !== null){
                this.getMoviesByCategory(this.category, this.page);
            }
        }
    }

    renderContent(discovering){
        if(discovering) {
            return(
                <Fragment>
                    <div class="title-section">
                        <h3>{this.state.label}</h3>
                    </div>
                    <div class="movies">
                        {
                            this.state.movies.map((movie, i) => (
                                <Poster key={movie.id} movie={movie} inGallery={false}/>
                            ))
                        }
                    </div>
                    { this.renderLoading(this.state.loading) }
                </Fragment>
            );
        }
        else {
            return(
                <Fragment>
                    <div class="title-section">
                        <h3>Genres</h3>
                    </div>
                    <Genres/>

                    <div class="title-section">
                        <h3>Now Playing</h3>
                        <a href="/movie?category=showing">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Indonesian Movies</h3>
                        <a href="/movie?category=indonesia">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.indonesianMovies}/>

                    <div class="title-section">
                        <h3>Most Popular</h3>
                        <a href="/movie?category=popular">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.popularMovies}/>

                    <div class="title-section">
                        <h3>Coming Soon</h3>
                    </div>
                    <Gallery movies={this.state.upcomingMovies}/>
                </Fragment>
            );
        }
    }

    renderLoading(loading){
        if(loading){
            return <div class="loading">Loading...</div>;
        }
    }

    render() {
        return(
            <Fragment>
                <Menubar/>
                <div id="content-movies" class="content">

                    {this.renderContent(this.state.discovering)}

                    <Footer/>
                </div>
            </Fragment>
        )
    }
}

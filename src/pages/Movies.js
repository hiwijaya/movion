import React, { Component, Fragment } from 'react';
import Menubar from '../components/Menubar';
import Genres from '../components/Genres';
import Gallery from '../components/Gallery';
import Poster from '../components/Poster';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';

import Discover from '../components/Discover';


export default class Movies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            discovering: false,
            movies: [],

            showingMovies: [],
            indonesianMovies: [],   // add dynamic localization
            popularMovies: [],
            upcomingMovies: [],
        }

        this.page = 1;
        this.movieService = new MovieService();
        this.discover = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleParameters();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleParameters() {
        const display = Lib.getParameter(this, 'display');
        if(display === null){
            this.defaultFeed();
            return;
        }

        this.setState({
            discovering: true
        });

        if(display.toLowerCase() === 'showing'){
            this.movieService.getShowing(this.page, (movies) => {
                this.setState({
                    movies
                });
            });
        }

    }

    defaultFeed() {
        this.movieService.getShowing(1, (movies) => {
            this.setState({
                showingMovies: Lib.more(movies, '/movie?display=showing')
            });
        });

        this.movieService.getIndonesianMovies(1, (movies) => {
            this.setState({
                indonesianMovies: Lib.more(movies, '/movie?display=indonesia')
            });
        });

        this.movieService.getPopularMovies(1, (movies) => {
            this.setState({
                popularMovies: Lib.more(movies, '/movie?display=popular')
            });
        });

        this.movieService.getUpcomingMovies((movies) => {   // '/movie?display=upcoming'
            this.setState({
                upcomingMovies: movies
            });
        });

    }

    isBottom(e) {
        return e.getBoundingClientRect().bottom <= window.innerHeight;
    }

    handleScroll() {
        const element = document.getElementById('content-movies');
        if (this.isBottom(element)) {
            this.page += 1;
            this.movieService.getShowing(this.page, (movies) => {
                let moreMovies = this.state.movies;
                moreMovies.push(...movies);
                this.setState({
                    movies: moreMovies
                });
            });
            console.log('header bottom reached');
            document.removeEventListener('scroll', this.handleScroll);
        }
        // TODO: NEED A LOT OF REFACTORING. Consider to add Loading component, and add 'safe fetch load' logic
    }

    renderContent(discovering){
        if(discovering) {
            return(
                <Fragment>
                    <div class="title-section">
                        <h3>Results</h3>
                    </div>
                    <div class="movies">
                        {
                            this.state.movies.map((movie, i) => (
                                <Poster key={movie.id} movie={movie}/>
                            ))
                        }
                    </div>

                    
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
                        <a href="/movie?display=showing">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Indonesia</h3>
                        <a href="/movie?display=indonesia">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.indonesianMovies}/>

                    <div class="title-section">
                        <h3>Most Popular</h3>
                        <a href="/movie?display=popular">
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

    render() {
        return(
            <Fragment>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div id="content-movies" class="content">

                    {this.renderContent(this.state.discovering)}

                    <Footer/>
                </div>
            </Fragment>
        )
    }
}

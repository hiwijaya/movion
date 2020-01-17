import React, { Component, Fragment } from 'react';
import Menubar from '../components/Menubar';
import Genres from '../components/Genres';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';

import Discover from '../components/Discover';


export default class Movies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingMovies: [],
            indonesianMovies: [],   // add dynamic localization
            popularMovies: [],
            upcomingMovies: [],
        }

        this.movieService = new MovieService();
        this.discover = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.defaultFeed();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleParameters(){
        const display = Lib.getParameter(this, 'display');
        const page = Lib.getParameter(this, 'page');

        if(display !== null){

        }
    }

    defaultFeed() {
        this.movieService.getShowing(1, (movies) => {
            this.setState({
                showingMovies: Lib.more(movies, '/movie?display=showing,page=1')
            });
        });

        this.movieService.getIndonesianMovies(1, (movies) => {
            this.setState({
                indonesianMovies: Lib.more(movies, '/movie?display=indonesia,page=1')
            });
        });

        this.movieService.getPopularMovies(1, (movies) => {
            this.setState({
                popularMovies: Lib.more(movies, '/movie?display=popular,page=1')
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
            console.log('header bottom reached');
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        return(
            <Fragment>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div id="content-movies" class="content">

                    <div class="title-section">
                        <h3>Genres</h3>
                    </div>
                    <Genres/>

                    <div class="title-section">
                        <h3>Now Playing</h3>
                        <a href="/movie?display=showing,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Indonesia</h3>
                        <a href="/movie?display=indonesia,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.indonesianMovies}/>

                    <div class="title-section">
                        <h3>Most Popular</h3>
                        <a href="/movie?display=popular,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.popularMovies}/>

                    <div class="title-section">
                        <h3>Coming Soon</h3>
                    </div>
                    <Gallery movies={this.state.upcomingMovies}/>

                    <Footer/>
                </div>
            </Fragment>
        )
    }
}

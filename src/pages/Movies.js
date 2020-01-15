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
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.movieService.getShowing(1, (movies) => {
            this.setState({
                showingMovies: Lib.more(movies, '/movie?category=showing,page=1')
            });
        });

        this.movieService.getIndonesianMovies(1, (movies) => {
            this.setState({
                indonesianMovies: Lib.more(movies, '/movie?category=indonesian,page=1')
            });
        });

        this.movieService.getPopularMovies(1, (movies) => {
            this.setState({
                popularMovies: Lib.more(movies, '/movie?category=popular,page=1')
            });
        });

        this.movieService.getUpcomingMovies((movies) => {
            this.setState({
                upcomingMovies: movies
            });
        });

    }

    render() {
        return(
            <Fragment>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div class="content">

                    <Genres/>

                    <div class="title-section">
                        <h3>Now Playing</h3>
                        <a href="/movie?category=showing,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Indonesian</h3>
                        <a href="/movie?category=indonesian,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.indonesianMovies}/>

                    <div class="title-section">
                        <h3>Most Popular</h3>
                        <a href="/movie?category=popular,page=1">
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

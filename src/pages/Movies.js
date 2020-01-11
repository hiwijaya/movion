import React, { Component, Fragment } from 'react';
import Menubar from '../components/Menubar';
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
            trendingMovies: [],
            popularMovies: [],
            rateMovies: [],
            upcomingMovies: []
        }

        this.movieService = new MovieService();
        this.discover = null;
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.movieService.getTrending('movie', (movies) => {
            this.setState({
                trendingMovies: movies
            });
        });

        this.movieService.getShowing(1, (movies) => {
            this.setState({
                showingMovies: Lib.more(movies, '/movies?category=showing,page=1')
            });
        });

    }

    render() {
        return(
            <Fragment>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div class="content">

                    <div class="title-section">
                        <h3>Now Showing</h3>
                        <a href="/movies?category=showing,page=1">
                            <span class="link">See All</span>
                        </a>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Trending Movies </h3>
                    </div>
                    <Gallery movies={this.state.trendingMovies}/>

                    <Footer/>
                </div>
            </Fragment>
        )
    }
}

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';

import Discover from '../components/Discover';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headlineMovie: null,
            trendingMovies: [],
            showingMovies: [],
        }

        this.movieService = new MovieService();
        this.discover = null;

    }

    componentDidMount() {
        this.movieService.getTrending('movie', (movies) => {

            const headline = movies[Lib.randomNumber(0, movies.length-1)];

            this.movieService.getMovie(headline.id, (movie) => {
                this.setState({
                    headlineMovie: movie,
                    trendingMovies: movies
                });
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
            <div>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div class="content">
                    <Headline movie={this.state.headlineMovie || undefined}/>

                    <div class="title-section">
                        <h3>Now Showing</h3>
                        <Link to="/movies?category=showing,page=1">
                            <span class="link">See All</span>
                        </Link>
                    </div>
                    <Gallery movies={this.state.showingMovies}/>

                    <div class="title-section">
                        <h3>Trending Movies </h3>
                    </div>
                    <Gallery movies={this.state.trendingMovies}/>


                    <Footer/>
                </div>
            </div>
        );
    }

}
import React, {Component} from 'react';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';
import Gallery from '../components/Gallery';

import Poster from '../components/Poster';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headlineMovie: null,
            trendingMovies: []
        }

        this.movieService = new MovieService();

    }

    componentDidMount() {
        this.movieService.getTrendingMovies((movies) => {

            const headline = movies[Lib.randomNumber(0, movies.length-1)];

            this.movieService.getMovie(headline.id, (movie) => {
                this.setState({
                    headlineMovie: movie,
                    trendingMovies: movies
                });
            });

        });

    }

    render() {
        return(
            <div>
                <Menubar/>
                <div class="content">
                    <Headline movie={this.state.headlineMovie || undefined}/>

                    <div class="title-section">
                        <h3>Trending Movies </h3>
                    </div>
                    <Gallery movies={this.state.trendingMovies}/>

                </div>
            </div>
        );
    }

}
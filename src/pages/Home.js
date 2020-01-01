import React, {Component} from 'react';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

import Cast from '../components/Cast/Cast';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headlineMovie: null,
            trendingMovies: [],
            trendingPersons: [],
        }

        this.movieService = new MovieService();

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

        this.movieService.getTrending('person', (persons) => {
            this.setState({
                trendingPersons: persons
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

                    <Cast person={this.state.trendingPersons[3] || undefined}/>


                    <Footer/>
                </div>
            </div>
        );
    }

}
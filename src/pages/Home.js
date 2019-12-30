import React, {Component} from 'react';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';


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
        this.movieService.getTrending(1, (movies) => {
            const headline = movies[Lib.randomNumber(0, movies.length)];
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
                </div>
            </div>
        );
    }

}
import React, {Component} from 'react';
import Discover from '../components/Discover';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Preview from '../components/Preview';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headlineMovie: null,
            trendingMovies: [],
            trendingPerson: [],
        }

        this.movieService = new MovieService();
        this.discover = null;
        this.preview = null;

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
            this.setState({trendingPerson: persons});
        })

    }

    render() {
        return(
            <div>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <Preview ref={(ref) => {this.preview = ref}}/>
                <div class="content">
                    <Headline movie={this.state.headlineMovie || undefined} 
                        onTrailerPress={() => this.preview.show(this.state.headlineMovie.trailer)}/>

                    <div class="title-section">
                        <h3>Trending Movies </h3>
                    </div>
                    <Gallery movies={this.state.trendingMovies}/>

                    <div class="title-section">
                        <h3>Trending Person </h3>
                    </div>
                    <Gallery cast={this.state.trendingPerson}/>


                    <Footer/>
                </div>
            </div>
        );
    }

}
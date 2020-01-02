import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import Rating from '../components/Rating';
import Social from '../components/Social';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';



export default class Movie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            selectedTab: 0,

            poster: '',
            title: '',
            release: '',
            rate: 0,
            vote: '',
            genres: null,
            overview: '',
            director: '',
            duration: '',
            budget: '',
            revenue: '',
            productions: '',
            social: [],
            cast: [],
            
            trailer: null,
            recommendationsMovies: [],
        }

        this.movieId = props.match.params.id;
        this.movieService = new MovieService();
    }

    componentDidMount() {
        this.movieService.getMovie(this.movieId, (movie) => {
            this.setState({
                movie,
                poster: movie.poster,
                title: movie.title,
                release: movie.release,
                rate: movie.rate,
                vote: movie.vote,
                genres: movie.genres,
                overview: movie.overview,
                director: movie.director,
                duration: movie.duration,
                budget: movie.budget,
                revenue: movie.revenue,
                productions: movie.productions,
                social: movie.social,
                cast: movie.cast,
                trailer: movie.trailer
            });
        });

        this.movieService.getRecommendations(this.movieId, (movies) => {
            this.setState({
                recommendationsMovies: movies.slice(0, 7)
            });
        });
    }

    renderGenres(genres){
        if(genres === null){
            return;
        }
        if(genres.length < 2){
            return <Link to={`/movie?genre=${genres[0].id}`} className="link">{genres[0].name}</Link>
        }

        return(
            <div>
                <Link to={`/movie?genre=${genres[0].id}`} className="link">{genres[0].name}</Link>
                <span>&nbsp;/&nbsp;</span>
                <Link to={`/movie?genre=${genres[1].id}`} className="link">{genres[1].name}</Link>
            </div>
        );
    }


    renderTab(selectedTab) {
        const active = {
            color: '#FFF',
            borderBottom: '2px solid #FFF',
        }
        return(
            <div class="tab center chorizontal">
                <div style={selectedTab === 0 ? active : null}>OVERVIEW</div>
                <div style={selectedTab === 1 ? active : null}>PHOTOS</div>
                <div style={selectedTab === 2 ? active : null}>VIDEOS</div>
            </div>
        );
    }

    renderOverview() {
        return(
            <div>
                <div class="movie-info">
                    <img class="poster" src={this.state.poster} alt={this.state.title}/>
                    <div class="detail">
                        <div class="title">{this.state.title}</div>
                        <p>{this.state.overview}</p>
                        <ul>
                            <li><span>Director</span><Link to={'/person/director'} className="link">{this.state.director}</Link></li>
                            <li><span>Released</span>{Lib.formatFullDate(this.state.release)}</li>
                            <li><span>Genres</span>{this.renderGenres(this.state.genres)}</li>
                            <li><span>Duration</span>{this.state.duration}</li>
                            <li><span>Budget</span>{this.state.budget}</li>
                            <li><span>Revenue</span>{this.state.revenue}</li>
                            <li><span>Rate</span> 
                                <Rating rate={this.state.rate}/> 
                                <div class="reviews">{` ${this.state.vote} reviews`}</div>
                            </li>
                            <li><span>Productions</span>{this.state.productions}</li>
                        </ul>

                        <Social ids={this.state.social}/>


                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Menubar/>
                <div class="content">
                    <Headline movie={this.state.movie || undefined}/>

                    {this.renderTab(this.state.selectedTab)}

                    {(this.state.selectedTab===0) && this.renderOverview()}


                    <Footer/>
                </div>
            </div>
        )
    }
}

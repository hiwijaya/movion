import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Discover from '../components/Discover';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';
import Rating from '../components/Rating';
import Social from '../components/Social';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Preview from '../components/Preview';
import PlayCircle from '../images/icon/play-circle.svg';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';


export default class Movie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0,
            
            movie: null,
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

            backdrops: [],
            posters: [],
            videos: [],

            trailer: null,
            similarMovies: [],
        }

        this.movieId = props.match.params.id;
        this.movieService = new MovieService();
        this.discover = null;
        this.preview = null;
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
                backdrops: movie.backdrops,
                posters: movie.posters,
                videos: movie.videos,
                trailer: movie.trailer,
            });
        });

        this.movieService.getSimilarMovies(this.movieId, (movies) => {
            this.setState({
                similarMovies: movies
            });
        });
    }

    selectTab(i){
        this.setState({selectedTab: i});
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
                <div style={selectedTab === 0 ? active : null} onClick={() => this.selectTab(0)}>OVERVIEW</div>
                <div style={selectedTab === 1 ? active : null} onClick={() => this.selectTab(1)}>PHOTOS</div>
                <div style={selectedTab === 2 ? active : null} onClick={() => this.selectTab(2)}>VIDEOS</div>
            </div>
        );
    }

    renderOverview() {
        return(
            <div class="overview">
                <div class="movie-info">
                    <img class="poster" src={this.state.poster} alt={this.state.title}/>
                    <div class="detail">
                        <div class="title">{this.state.title}</div>
                        <p>{this.state.overview}</p>
                        <ul>
                            <li><span>Director</span><Link to={'/person/director'} className="link">{this.state.director}</Link></li>
                            <li><span>Release</span>{this.state.release}</li>
                            <li><span>Genre</span>{this.renderGenres(this.state.genres)}</li>
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
                <div class="title-section">
                    <h3>Cast</h3>
                </div>
                <Gallery cast={this.state.cast}/>
            </div>
        );
    }

    renderPhotos() {
        return(
            <div class="photos">
                <div class="title-section">
                    <h3>Backdrops</h3>
                    <h6>{this.state.backdrops.length} images</h6>
                </div>
                <div class="backdrops">
                    {
                        this.state.backdrops.map((b, i) => (
                            <img src={Lib.getBackdropURL(b.file_path)} role="button" alt="backdrops"
                                onClick={() => this.preview.show(Lib.getBackdropURL(b.file_path))}/>
                        ))
                    }
                </div>

                <div class="title-section">
                    <h3>Posters</h3>
                    <h6>{this.state.posters.length} images</h6>
                </div>
                <div class="posters">
                    {
                        this.state.posters.map((p, i) => (
                            <img src={Lib.getPosterURL(p.file_path)} role="button" alt="posters"
                                onClick={() => this.preview.show(Lib.getPosterURL(p.file_path))}/>
                        ))
                    }
                </div>
            </div>
        );
    }

    renderVideos() {
        return(
            <div class="videos">
                {
                    this.state.videos.map((v, i) => (
                        <div class="video">
                            <div class="thumbnail">
                                <img src={Lib.getVideoThumbnail(v.key)} alt="videos"/>
                                <img class="play" src={PlayCircle} alt="play"/>
                            </div>
                            <div class="title">
                                <h5>{v.name}</h5>
                                <h6>{v.type}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) => {this.discover = ref}}/>
                <Preview ref={(ref) => {this.preview = ref}}/>
                <div class="content">
                    <Headline movie={this.state.movie || undefined} 
                        onTrailerPress={() => this.preview.show(this.state.trailer)}/>

                    {this.renderTab(this.state.selectedTab)}

                    {(this.state.selectedTab === 0) && this.renderOverview()}
                    {(this.state.selectedTab === 1) && this.renderPhotos()}
                    {(this.state.selectedTab === 2) && this.renderVideos()}

                    <div class="title-section">
                        <h3>Similar Movies</h3>
                    </div>
                    <Gallery movies={this.state.similarMovies}/>


                    <Footer/>
                </div>
            </div>
        )
    }
}

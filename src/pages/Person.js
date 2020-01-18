import React, { Component } from 'react';
import Menubar from '../components/Menubar';
import Poster from '../components/Poster';
import Social from '../components/Social';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService';
import * as Lib from '../utils/Lib.js';


export default class Person extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedTab: 0,

            photo: '',
            name: '',
            biography: '',
            knownFor: '',
            birthday: '',
            placeBirth: '',
            social: [],

            movies: [],
            photos: [],
            credits: [],
        }

        this.personId = props.match.params.id;
        this.movieService = new MovieService();

    }

    componentDidMount() {
        this.movieService.getPerson(this.personId, (person) => {
            this.setState({
                photo: person.photo,
                name: person.name,
                biography: person.biography,
                knownFor: person.knownFor,
                birthday: person.birthday,
                placeBirth: person.placeBirth,
                social: person.social,
                movies: person.movies,
                photos: person.photos,
                credits: person.credits,
            });
        });
    }

    selectTab(i){
        this.setState({selectedTab: i});
    }

    renderTab(selectedTab) {
        const active = {
            color: '#FFF',
            borderBottom: '2px solid #FFF',
        }
        return(
            <div class="tab center chorizontal">
                <div style={selectedTab === 0 ? active : null} onClick={() => this.selectTab(0)}>KNOWN FOR</div>
                <div style={selectedTab === 1 ? active : null} onClick={() => this.selectTab(1)}>PHOTOS</div>
                <div style={selectedTab === 2 ? active : null} onClick={() => this.selectTab(2)}>CREDITS</div>
            </div>
        );
    }

    renderMovies(movies) {
        return(
            <div class="movies">
                {
                    movies.map((movie, i) => (
                        <Poster key={movie.id} movie={movie} inGallery={false}/>
                    ))
                }
            </div>
        );
    }

    renderPhotos(photos) {
        return(
            <div class="photos">
                <div class="title-section">
                    <h3>Photos</h3>
                    <h6>{photos.length} images</h6>
                </div>
                <div class="posters">
                    {
                        photos.map((p, i) => (
                            <img key={i} src={Lib.getPosterURL(p.file_path)} alt="posters"/>
                        ))
                    }
                </div>
            </div>
        );
    }

    renderCredits(credits) {
        return(
            <ul class="credits">
                {
                    credits.map((cast, i) => (
                        <li key={cast.id}>
                            <a href={`/movie/${cast.id}`} class="chorizontal">
                                <div class="year">{Lib.getYear(cast.release_date) || '-'}</div>
                                <div>{cast.title}</div>
                                <div class="character">&nbsp;{`as ${cast.character}`}</div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        );
    }
    
    render() {
        return (
            <div>
                <Menubar/>
                <div class="content">
                    <div class="profile">
                        <div class="photo">
                            <img src={this.state.photo} alt="Photos"/>
                        </div>
                        <div class="overview">
                            <h2>{this.state.name}</h2>
                            <p>{this.state.biography}</p>
                            <ul>
                                <li><span>Known For</span>{this.state.knownFor}</li>
                                <li><span>Born</span>{this.state.birthday}</li>
                                <li><span>Place of Birth</span>{this.state.placeBirth}</li>
                            </ul>
                            <Social ids={this.state.social}/>
                        </div>
                    </div>

                    {this.renderTab(this.state.selectedTab)}
                    {(this.state.selectedTab === 0) && this.renderMovies(this.state.movies)}
                    {(this.state.selectedTab === 1) && this.renderPhotos(this.state.photos)}
                    {(this.state.selectedTab === 2) && this.renderCredits(this.state.credits)}

                    <Footer/>
                </div>
            </div>
        )
    }
}

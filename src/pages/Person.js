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

    renderPhotos() {
        return(
            <div class="photos">
                <div class="title-section">
                    <h3>Photos</h3>
                    <h6>{this.state.posters.length} images</h6>
                </div>
                <div class="posters">
                    {
                        this.state.photos.map((p, i) => (
                            <img src={Lib.getPosterURL(p.file_path)} alt="posters"/>
                        ))
                    }
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <Menubar/>
                <div class="content">
                    <div class="profile">
                        <div class="photo">
                            <img src={this.state.photo}/>
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

                </div>
            </div>
        )
    }
}

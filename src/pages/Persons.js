import React, { Component } from 'react';
import Discover from '../components/Discover';
import Menubar from '../components/Menubar';
import Cast from '../components/Cast';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService.js';
import * as Lib from '../utils/Lib.js';


export default class Persons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            persons: []
        }

        this.movieService = new MovieService();
        this.discover = null;

        this.page = 1;
        this.pages = 1;

    }

    componentDidMount() {
        this.getPersons(this.page);
    }

    getPersons(page) {
        this.movieService.getPopularPersons(page, (persons, pages, total) => {
            this.pages = pages;
            this.setState({
                persons
            });
        });
    }


    render() {
        return(
            <div>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div class="content">
                    <div class="title-section">
                        <h3>Popular Person </h3>
                    </div>
                    <div class="persons">
                        {
                            this.state.persons.map((person, i) => (
                                <Cast key={person.id} person={person}/>
                            ))
                        }
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

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
            persons: [],
            loading: false
        }

        this.movieService = new MovieService();
        this.discover = null;
        this.handleScroll = this.handleScroll.bind(this);

        this.page = 1;
        this.pages = 1;

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getPersons(this.page);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getPersons(page) {
        this.setState({loading: true});

        this.movieService.getPopularPersons(page, (persons, pages, total) => {
            let morePersons = this.state.persons;
            morePersons.push(...persons);

            this.setState({
                persons: morePersons,
                loading: false
            });

            this.page += 1;
            this.pages = pages;
        });
    }

    isBottom(e) {
        return e.getBoundingClientRect().bottom <= (window.innerHeight + 10);
    }

    handleScroll() {
        if(this.page > this.pages){
            return;
        }
        if(this.state.loading){
            return;
        }

        const content = document.getElementById('content-persons');
        if (this.isBottom(content)) {
            this.getPersons(this.page);
        }
    }

    renderLoading(loading){
        if(loading){
            return <div class="loading">Loading...</div>;
        }
    }

    render() {
        return(
            <div>
                <Menubar onSearchPress={() => this.discover.toggle()}/>
                <Discover ref={(ref) =>{this.discover = ref}}/>
                <div id="content-persons" class="content">
                    <div class="title-section">
                        <h3>Popular Person </h3>
                    </div>
                    <div class="persons">
                        {
                            this.state.persons.map((person, i) => (
                                <Cast key={person.id} person={person} inGallery={false}/>
                            ))
                        }
                    </div>
                    { this.renderLoading(this.state.loading) }

                    <Footer/>
                </div>
            </div>
        );
    }
}

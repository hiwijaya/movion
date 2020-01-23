import React, { Component } from 'react';
import Menubar from '../components/Menubar';
import Poster from '../components/Poster/';
import Cast from '../components/Cast';
import Footer from '../components/Footer';
import MovieService from '../services/MovieService';
import * as Lib from '../utils/Lib';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            results: [],

            loading: false
        }

        this.movieService = new MovieService();
        this.handleScroll = this.handleScroll.bind(this);

        this.page = 1;
        this.pages = 1;
    }

    componentDidMount() {
        this.search();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    search() {
        const q = Lib.getParameter(this, 'q');
        const keyword = decodeURI(q);
        if(keyword === null){
            return
        }

        this.setState({ 
            keyword,
            loading: true
        });

        this.movieService.search(q, this.page, (results, pages) => {
            const moreResults = this.state.results;
            moreResults.push(...results);
            this.setState({
                results: moreResults,
                loading: false
            });
            this.pages = pages;
            this.page += 1;
        });

    }

    isBottom(e) {
        return e.getBoundingClientRect().bottom <= (window.innerHeight + 10);
    }

    handleScroll() {
        if(this.state.keyword === ''){
            return;
        }
        if(this.page > this.pages){
            return;
        }
        if(this.state.loading){
            return;
        }

        const content = document.getElementById('content-search');
        if (this.isBottom(content)) {
            this.search();
        }
    }

    renderLoading(loading){
        if(loading){
            return <div class="loading">Loading...</div>
        }
    }

    render() {
        return (
            <div>
                <Menubar/>
                <div id="content-search" class="content">
                    <div class="title-section">
                        <h3>Results for: "{this.state.keyword}" </h3>
                    </div>

                    <div class="results">
                        {
                            this.state.results.map((result, i) => {
                                if(result.mediaType === 'movie'){
                                    return <Poster movie={result} inGallery={false}/>
                                }
                                else{
                                    return <Cast person={result} inGallery={false}/>
                                }
                            })
                        }
                    </div>
                    {this.renderLoading(this.state.loading)}
                    
                    <Footer/>
                </div>
                
            </div>
        )
    }
}

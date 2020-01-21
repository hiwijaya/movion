import React, { Component } from 'react';
import Menubar from '../components/Menubar';
import Poster from '../components/Poster/';
import Cast from '../components/Cast';
import MovieService from '../services/MovieService';
import * as Lib from '../utils/Lib';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            results: []
        }

        this.movieService = new MovieService();
        this.page = 1;
        this.pages = 1;

    }

    componentDidMount() {
        this.search();
    }

    search() {
        const q = Lib.getParameter(this, 'q');
        const keyword = decodeURI(q);
        if(keyword === null){
            return
        }

        this.setState({ keyword });

        this.movieService.search(q, this.page, (results, pages) => {
            this.setState({
                results: results
            });
            this.pages = pages;
            this.page += 1;
        })

        
    }

    render() {
        return (
            <div>
                <Menubar/>
                <div class="content">
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

                </div>
                
            </div>
        )
    }
}

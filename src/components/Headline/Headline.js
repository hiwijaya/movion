import React, {Component} from 'react';
import './Headline.css';
import { Link } from 'react-router-dom';
import play from '../../images/icon/play.svg';
import playCircle from '../../images/icon/play-circle.svg';
import Rating from '../Rating';
import * as Lib from '../../utils/Lib';


export default class Headline extends Component {

    constructor(props){
        super(props);

        this.state = {
            windowWidth: 0
        }

        this.updateDimensions = this.updateDimensions.bind(this);

    }

    componentDidMount(){
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        this.setState({ windowWidth });
    }

    renderTrailerButton(onTrailerPress){
        return(
            <button type="button" class="trailer-button center" onClick={() => onTrailerPress()}>
                <img src={play} alt="play"/>
                <h5> Watch Trailer</h5>
            </button>
        );
    }

    render(){
        const background = {
            backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${this.props.movie.backdrop})`,
        }
        const backgroundResponsive = {
            backgroundImage: `linear-gradient(to top, #000, transparent 50%, transparent), url(${this.props.movie.backdrop})`,
        }

        return (
            <div class="headline">
                <span/>
                <div class="backdrop center" style={(this.state.windowWidth < 1024) ? backgroundResponsive : background}>
                    <img src={playCircle} class="trailer-play" alt="play trailer"/>
                </div>

                <div class="desc">
                    <Link to={`/movie/${this.props.movie.id}`}>
                        <div class="title">{this.props.movie.title}</div>
                    </Link>
                    <div class="info chorizontal">
                        <Rating rate={this.props.movie.rate}/>
                        <h5>{`${this.props.movie.vote} reviews`}</h5>
                        <h5>{this.props.movie.shortGenre}</h5>
                        <h5 class="duration">{this.props.movie.duration}</h5>
                        <h5 class="year">{this.props.movie.releaseYear}</h5>
                    </div>
                    <p>
                        {Lib.getShortOverview(this.props.movie.overview)}
                    </p>
                    {this.renderTrailerButton(this.props.onTrailerPress)}
                </div>
            </div>
        );
    }
}
Headline.defaultProps = {
    movie: {
        id: '',
        backdrop: '',
        title: '',
        rate: 0,
        vote: '',
        shortGenre: '',
        releaseYear: '',
        duration: '',
        overview: ''
    },
    onTrailerPress: () => {} 
}
import React, { Component } from 'react';
import './Preview.css';
import X from '../../images/icon/x.svg';


export default class Preview extends Component {

    constructor(props){
        super(props);

        this.state = {
            show: false,
            item: ''
        }

        this.youtubeIframe = null;
    }

    show(item) {
        this.setState({
            item,
            show: true
        });
    }

    hide() {
        // stop playing video
        const iframe = document.getElementById('youtubeiframe');
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');

        this.setState({
            show: false
        });
    }

    renderItem(item){
        if(item === null){
            return <h3>Content not available.</h3>;
        }
        else if(item.startsWith('https://www.youtube.com/')){
            return <iframe id="youtubeiframe" width="100%" height="100%" src={item}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
        }
        else {
            return <img src={item} alt="Preview"/>
        }
    }

    render() {
        const display = {display: (this.state.show) ? 'flex' : 'none'};
        return(
            <div class="preview" style={display}>
                <div class="chorizontal close">
                    <img src={X} role="button" onClick={() => this.hide()} alt="Close"/>
                </div>
                <div class="item">
                    {this.renderItem(this.state.item)}
                </div>
            </div>
        );
    }
}
Preview.defaultProps = {
    item: '',
}
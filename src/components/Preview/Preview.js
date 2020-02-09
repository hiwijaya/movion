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

        this.previewItem = null;
        this.hide = this.hide.bind(this);
    }

    show(item) {
        this.setState({
            item,
            show: true
        }, () => {
            document.addEventListener('click', this.hide);
        });
    }

    hide(e) {
        if(!this.previewItem.contains(e.target)){
            // stop playing video
            const iframe = document.getElementById('youtubeiframe');
            if(iframe !== null){
                iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
            }
        
            this.setState({
                show: false
            }, () => {
                document.removeEventListener('click', this.hide);
            });
        }
    }

    renderItem(item){
        if(item === null){
            return <h3>Content not available.</h3>;
        }
        else if(item.startsWith('https://www.youtube.com/')){
            return <iframe id="youtubeiframe" width="100%" src={item} title="Trailer"
                        allowfullscreen="allowfullscreen" ref={(element) => {this.previewItem = element}}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
        }
        else {
            return <img src={item} alt="Preview" ref={(element) => {this.previewItem = element}}/>
        }
    }

    render() {
        const display = {display: (this.state.show) ? 'flex' : 'none'};
        return(
            <div class="preview" style={display}>
                <div class="chorizontal close">
                    <img src={X} role="button" onClick={() => this.hide(this)} alt="Close"/>
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
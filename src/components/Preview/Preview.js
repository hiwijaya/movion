import React, { Component } from 'react';
import './Preview.css';
import X from '../../images/icon/x.svg';


export default class Preview extends Component {

    state = {
        show: false,
        item: ''
    }

    show(item) {
        this.setState({
            item,
            show: true
        });
    }

    hide() {
        this.setState({
            show: false
        });
    }

    render() {
        const display = {display: (this.state.show) ? 'flex' : 'none'};
        return(
            <div class="preview" style={display}>
                <div class="chorizontal close">
                    <img src={X} role="button" onClick={() => this.hide()} alt="Close"/>
                </div>
                <div class="item">
                    <img src={this.state.item} alt="Preview"/>
                </div>
            </div>
        );
    }
}
Preview.defaultProps = {
    item: '',
}
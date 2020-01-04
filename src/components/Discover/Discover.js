import React, {Component} from 'react';
import './Discover.css';


export default class Discover extends Component {

    constructor(props){
        super(props);

        this.state = {
            show: false,
            keyword: ''
        }

        this.toggleOff = this.toggleOff.bind(this);
    }

    toggle() {
        const isShow = this.state.show;
        if(isShow){
            this.toggleOff();
        }
        else{
            this.setState({
                show: true
            }, () => {
                document.addEventListener('click', this.toggleOff);
            })
        }
        
    }

    toggleOff(){
        this.setState({
            show: false
        }, () => {
            document.removeEventListener('click', this.toggleOff);
        })
    }

    handleChange(e) {
        this.setState({keyword: e.target.value});
    }

    handleSubmit(e){
        if(e.key === 'Enter'){
            alert(this.state.keyword);
        }
    }

    render() {
        const display = {display: this.state.show ? 'flex' : 'none'};
        return(
            <div class="discover cvertical" style={display}>
                <input type="text" placeholder="Search for movie or person..." 
                    value={this.state.keyword}
                    onChange={(event) => this.handleChange(event)} 
                    onKeyPress={(event) => this.handleSubmit(event)} />
            </div>
        );
    }
}
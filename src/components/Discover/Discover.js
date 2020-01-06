import React, {Component} from 'react';
import './Discover.css';


export default class Discover extends Component {

    constructor(props){
        super(props);

        this.state = {
            show: false,
            keyword: ''
        }

        
        this.discoverElement = null;
        this.toggleOff = this.toggleOff.bind(this);
    }

    toggle() {
        const showing = this.state.show;
        if(showing){
            this.toggleOff(this);
        }
        else{
            this.setState({
                show: true
            }, () => {
                document.addEventListener('click', this.toggleOff);
            })
        }
        
    }

    toggleOff(e){
        if(!this.discoverElement.contains(e.target)){
            this.setState({
                show: false,
                keyword: ''
            }, () => {
                document.removeEventListener('click', this.toggleOff);
            })
        }
        
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
        const toggleClass = (this.state.show) ? 'discover show' : 'discover hide';
        return(
            <div className={toggleClass} ref={(element) => {this.discoverElement = element}}>
                <input type="text" placeholder="Search for movie or person..." 
                    value={this.state.keyword}
                    onChange={(event) => this.handleChange(event)} 
                    onKeyPress={(event) => this.handleSubmit(event)} />
            </div>
        );
    }
}
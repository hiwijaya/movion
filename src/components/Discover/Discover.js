import React, {Component} from 'react';
import './Discover.css';


export default class Discover extends Component {

    constructor(props){
        super(props);

        this.state = {
            keyword: ''
        }

        this.discoverElement = null;
        this.inputElement = null;
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
                this.inputElement.focus();
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

    handleSubmit(e) {
        if(e.key === 'Enter'){
            const keyword = this.state.keyword.trim();

            if(keyword.length <= 1){
                return;
            }

            if(keyword.toLowerCase().startsWith('year=')){
                let year = keyword.slice(5).trim();
                if(year.length !== 4){
                    return
                }
                if(isNaN(year)){
                    return;
                }
                window.location.href = `/search?year=${encodeURI(year)}`;
            }
            else{
                window.location.href = `/search?q=${encodeURI(keyword)}`;
            }

        }
    }

    render() {
        const toggleClass = (this.state.show) ? 'discover show' : 'discover hide';
        return(
            <div className={toggleClass} ref={(element) => {this.discoverElement = element}}>
                <input type="text" ref={(element) => {this.inputElement = element}}
                    placeholder="Search for movie, person, or year=2020" 
                    value={this.state.keyword}
                    onChange={(e) => this.handleChange(e)} 
                    onKeyPress={(e) => this.handleSubmit(e)} />
            </div>
        );
    }
}
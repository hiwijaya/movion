import React, {Component} from 'react';
import Menubar from '../components/Menubar';
import Headline from '../components/Headline';


export default class Home extends Component {

    render() {
        return(
            <div>
                <Menubar/>
                <div class="content">
                    <Headline/>
                </div>
            </div>
        );
    }

}
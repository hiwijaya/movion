import React from 'react';
import './Rating.css';
import star from '../../images/icon/star-yellow.svg';


function Rating({rate}) {

    return (
        <div class="rating">
            <img src={star} alt="star"/>
            <div>{(rate === 0) ? '-' : rate}</div>
        </div>
    );
}
Rating.defaultProps = {
    rate: '-'
}
export default Rating;

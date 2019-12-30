import React from 'react';
import './Rating.css';
import star from '../../images/icon/star.svg';


function Rating({rate}) {

    return (
        <div class="rating">
            <img src={star} alt="star"/>
            <h6>{(rate === 0) ? '-' : rate}</h6>
        </div>
    );
}
Rating.defaultProps = {
    rate: '-'
}
export default Rating;

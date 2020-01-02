import React from 'react';
import './Rating.css';
import star from '../../images/icon/star.svg';


function putDecimal(num){
    if(num % 1 === 0){
        return `${num.toString()}.0`;
    }
    return num
}

function Rating({rate}) {

    return (
        <div class="rating">
            <img src={star} alt="star"/>
            <div>{(rate === 0) ? '-' : putDecimal(rate)}</div>
        </div>
    );
}
Rating.defaultProps = {
    rate: '-'
}
export default Rating;

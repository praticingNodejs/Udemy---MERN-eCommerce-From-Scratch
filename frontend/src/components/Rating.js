import React from 'react';
import PropTypes from 'prop-types'

const Star = ({ value, starNumber, color }) => {
    return (
        <span>
            <i style={{ color }} className={
                value >= starNumber ? 'fas fa-star' :
                    value >= starNumber - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
            }></i>
        </span>
    )
};

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <Star value={value} starNumber={1} color={color} />
            <Star value={value} starNumber={2} color={color} />
            <Star value={value} starNumber={3} color={color} />
            <Star value={value} starNumber={4} color={color} />
            <Star value={value} starNumber={5} color={color} />

            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825',
};

// validate
Rating.propType = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;

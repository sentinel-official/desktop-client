import * as PropTypes from 'prop-types';
import React from 'react';

const Image = (props) => {
    return (
        <img
            alt={props.alt}
            className={props.className}
            src={props.src}
        />
    );
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default Image;

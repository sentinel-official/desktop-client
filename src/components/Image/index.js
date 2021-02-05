import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Image = ({
    alt,
    className,
    src,
}) => {
    return (
        <img
            alt={alt}
            className={className}
            src={src}
        />
    );
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default Image;

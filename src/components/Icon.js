import * as PropTypes from 'prop-types';
import React from 'react';
import icons from '../assets/icons.svg';

const Icon = ({
    className,
    icon,
}) => {
    return (
        <svg
            className={`icon icon-${className}`}
            viewBox="0 0 16 16">
            <use xlinkHref={`${icons}#icon-${icon}`}/>
        </svg>
    );
};

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Icon;

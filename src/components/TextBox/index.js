import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const TextBox = (props) => {
    return (
        <p className={props.className}>
            {props.value}
        </p>
    );
};

TextBox.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default TextBox;

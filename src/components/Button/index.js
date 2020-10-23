import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

const Button = (props) => {
    return (
        <input
            className="Button"
            type="submit"
            value={props.name}
            onClick={props.onClick}/>

    );
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;

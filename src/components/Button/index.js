import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

const Button = (props) => {
    return (
        <input
            className="Button"
            type="submit"
            value={props.button_name}
            onClick={props.onClick}/>

    );
};

Button.propTypes = {
    button_name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    form_name: PropTypes.string,
};

export default Button;

import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Button = (props) => {
    return (
        <button className={props.className}>
            { props.loading
                ? <span aria-hidden="true" className="spinner-border spinner-border-sm" role="status"></span>
                : props.value
            }
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export default Button;

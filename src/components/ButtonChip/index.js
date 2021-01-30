import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const ButtonChip = (props) => {
    const onClick = () => props.onClick(props.value);
    return (
        <button
            className={props.className}
            type={props.type}
            onClick={onClick}>
            {props.value}
        </button>
    );
};

ButtonChip.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonChip;

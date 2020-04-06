import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Card = (props) => {
    return (
        <div className="card">
            <div className="values">
                <p className="amount_value">
                    {props.value[0]}<b>{props.value[1] ? '.' + props.value[1] : ''}</b>
                </p>
                <div className="wallet_type">
                    <p className="type_name">{props.type !== '' ? props.type : 'tsent'}</p>
                </div>
            </div>
            <div className="logo">
                {props.image}
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
};

export default Card;

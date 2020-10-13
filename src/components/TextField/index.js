import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const TextField = (props) => {
    const onChange = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <input
            className={'text_field'}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={onChange}/>
    );
};

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default TextField;

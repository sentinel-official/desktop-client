import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const InputField = (props) => {
    const onChange = (e) => props.onChange(e.target.value);
    return (
        <div className="form-group">
            <input
                className={props.className}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required ? props.required : false}
                type={props.type}
                onChange={onChange}
            />
        </div>
    );
};

InputField.propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InputField;

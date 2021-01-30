import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Label = (props) => {
    return (
        <div className="form-group">
            <label className={props.className}>
                {props.labelText}
            </label>
        </div>
    );
};

Label.propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
};

export default Label;

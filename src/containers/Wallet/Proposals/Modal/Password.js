import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TextInputField from '../../../../components/TextInputField';

const Password = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="password"
            placeholder="Enter Password"
            required={true}
            type="password"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Password.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default connect()(Password);

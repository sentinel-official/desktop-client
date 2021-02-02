import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setKeyName } from '../../actions/keys';
import InputField from '../../components/InputField';
import { ValidateName } from './_validation';

const Name = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();
        props.onChange({
            value,
            error: {
                message: ValidateName(value).message,
            },
        });
    };

    return (
        <InputField
            className="form-control"
            name="name"
            placeholder="Enter Name"
            required={true}
            type="text"
            value={props.value}
            onChange={onChange}
        />
    );
};

Name.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.name.value,
    };
};

const actionsToProps = {
    onChange: setKeyName,
};

export default connect(stateToProps, actionsToProps)(Name);

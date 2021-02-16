import * as PropTypes from 'prop-types';
import { ValidateName } from './_validation';
import { capitalizeFirstLetter } from '../../utils/string';
import { connect } from 'react-redux';
import { setKeyName } from '../../actions/keys';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const Name = (props) => {
    const onChange = ({ target: { value } }) => {
        value = capitalizeFirstLetter(value);
        props.onChange({
            value,
            error: ValidateName(value),
        });
    };

    return (
        <TextInputField
            autofocus={false}
            className="form-control"
            error={props.input.error}
            name="name"
            placeholder="Enter Name"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Name.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.keys.post.name,
    };
};

const actionsToProps = {
    onChange: setKeyName,
};

export default connect(stateToProps, actionsToProps)(Name);

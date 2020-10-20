import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { setPassword } from '../../actions/application';

const PasswordField = (props) => {
    return (
        <div className="label_and_field">
            <div className="label">
                PASSWORD
            </div>
            <div className="field">
                <TextField
                    id="password_text_field"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

PasswordField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.password,
    };
};

const actionsToProps = {
    onChange: setPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordField);

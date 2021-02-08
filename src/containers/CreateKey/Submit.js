import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { postKeys } from '../../actions/keys';
import Button from '../../components/Button';
import { ValidateMnemonic, ValidateName, ValidatePassword } from './_validation';

const Submit = (props) => {
    const onClick = () => {
        props.onClick(props.history);
    };

    const disabled = (
        ValidateMnemonic(props.mnemonic.value).message !== '' ||
        ValidateName(props.name.value).message !== '' ||
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Create"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    inProgress: PropTypes.bool.isRequired,
    mnemonic: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    name: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        mnemonic: state.keys.post.mnemonic,
        name: state.keys.post.name,
        password: state.keys.post.password,
        inProgress: state.keys.post.inProgress,
    };
};

const actionsToProps = {
    onClick: postKeys,
};

export default connect(stateToProps, actionsToProps)(Submit);
